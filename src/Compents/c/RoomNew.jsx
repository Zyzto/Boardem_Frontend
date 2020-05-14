import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from '@material-ui/core'
import { useParams, useHistory } from 'react-router-dom'
import Image from 'material-ui-image'

const get_game = gql`
  query Game($id: ID!) {
    game(id: $id) {
      name
      img
    }
  }
`
const create_room = gql`
  mutation NewRoom($game: ID!, $password: String) {
    newRoom(game: $game, password: $password) {
      id
    }
  }
`

export default (props) => {
  const history = useHistory()
  const { id } = useParams()
  const { loading, error, data } = useQuery(get_game, {
    variables: { id },
  })
  const [createRoomMut] = useMutation(create_room)
  const onChangeInput = ({ target: { name, value } }) => {
    setInputField({ ...inputField, [name]: value })
  }
  const [inputField, setInputField] = useState({})
  const newRoomHandler = () => {
    let newRoom
    let game = id
    if (inputField) newRoom = { game, password: inputField.password }
    if (!inputField) newRoom = { game }
    createRoomMut({ variables: { ...newRoom } })
      .then((data) => {
        //TODO redirect to room not root
        history.push('/')
        return props.handleSnk('Room Created!')
      })
      .catch((err) => {
        return props.handleSnk(`${err}`, 'error')
      })
  }
  if (loading) return <CircularProgress />
  if (error) return props.handleSnk(`${error}`, 'error')
  return (
    <>
      {data ? (
        <Paper>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item>
              <Typography variant={'h3'}>{data.game.name}</Typography>
            </Grid>
            <Grid item>
              <img
                src={data.game.img}
                alt='Game'
                style={{ width: '300', height: '300', overflow: 'hidden' }}
              />
            </Grid>
          </Grid>
          <Box display={'flex'} width={1}>
            <TextField
              fullWidth
              label={'Password (optional)'}
              type={'password'}
              name={'password'}
              onChange={(e) => onChangeInput(e)}></TextField>
          </Box>
          <Box display={'flex'} width={1}>
            <Button fullWidth onClick={() => newRoomHandler()}>
              Create Room
            </Button>
          </Box>
        </Paper>
      ) : null}
    </>
  )
}
