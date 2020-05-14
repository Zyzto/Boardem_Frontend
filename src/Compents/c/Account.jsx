import React, { useState } from 'react'
import {
  Box,
  ListItem,
  TextField,
  Button,
  FormControl,
  List,
} from '@material-ui/core'
import useStyles from './Theme'
import { gql, useMutation } from '@apollo/client'
import Dia from './Dia'
import { useHistory } from 'react-router-dom'

const editGQL = gql`
  mutation EditUser(
    $username: String
    $email: String
    $newPassword: String
    $password: String!
  ) {
    editUser(
      username: $username
      email: $email
      newPassword: $newPassword
      password: $password
    ) {
      username
    }
  }
`
const deleteGQL = gql`
  mutation DeleteUser {
    deleteUser
  }
`

export default (props) => {
  const history = useHistory()
  const classes = useStyles()
  const [editMut] = useMutation(editGQL)
  const [delMut] = useMutation(deleteGQL)
  const [dia, setDia] = useState(false)
  const onChangeInput = ({ target: { name, value } }) => {
    setInputField({ ...inputField, [name]: value })
  }
  const [inputField, setInputField] = useState({})
  const editHandler = async () => {
    // console.log({ ...inputField })
    if (!inputField['password'])
      return props.handleSnk('Password missing', 'error')
    if (inputField['newPassword'] !== inputField['password-confirm'])
      return props.handleSnk("New Passwords aren't matched", 'error')

    await editMut({
      variables: {
        ...inputField,
      },
    })
      .then((data) => {
        // console.log(data)
        return props.handleSnk(`User information has been updated`)
      })
      .catch((err) => {
        return props.handleSnk(`${err}`, 'error')
      })
  }
  const deleteHandler = async () => {
    delMut()
      .then((data) => {
        localStorage.removeItem('authorization')
        history.push('/')
        return props.handleSnk(`User Account has been deleted`)
      })
      .catch((err) => {
        return props.handleSnk(`${err}`, 'error')
      })
  }
  return (
    <>
      {dia ? (
        <Dia
          msg={
            'This action is irreversible and your account will be deleted forever'
          }
          title={'Delete Account ?'}
          func={deleteHandler}
        />
      ) : null}
      <Box className={classes.accountField} width={1} justifyContent='center'>
        <List>
          <FormControl>
            <ListItem>
              <TextField
                fullWidth
                label={'Username'}
                type='username'
                name={'username'}
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label='Email'
                type='email'
                name='email'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label='New Password'
                type='password'
                name='newPassword'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label='New Password Confirm'
                type='password'
                name='password-confirm'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
            <ListItem>
              <TextField
                label='Password'
                type='password'
                name='password'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
            <ListItem justifycontent='center'>
              <Button p={1} onClick={() => editHandler()}>
                Edit
              </Button>
              <Button color='secondary' p={1} onClick={() => setDia(true)}>
                Delete Account
              </Button>
            </ListItem>
          </FormControl>
        </List>
      </Box>
    </>
  )
}
