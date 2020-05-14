import React, { useState, useEffect } from 'react'
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  TextField,
  IconButton,
  CircularProgress,
  Paper,
} from '@material-ui/core'
import useStyles from './Theme'
import { ArrowForward } from '@material-ui/icons'
import { gql, useQuery, useMutation, useSubscription } from '@apollo/client'
import JwtDecode from 'jwt-decode'
import { useParams } from 'react-router-dom'

const MESSAGES_SUBSCRIPTION = gql`
  subscription($id: ID!) {
    messageAdded(id: $id) {
      sender {
        username
      }
      body
    }
  }
`
const MESSAGES_GET = gql`
  query($id: ID!) {
    messages(id: $id) {
      sender {
        username
      }
      body
    }
  }
`
const MESSAGES_SEND = gql`
  mutation($id: ID!, $sender: ID!, $body: String!) {
    addMessage(id: $id, sender: $sender, body: $body) {
      sender {
        username
      }
      body
    }
  }
`

export default (props) => {
  const { id } = useParams()
  const { loading, error, data } = useQuery(MESSAGES_GET, {
    variables: {
      id,
    },
  })
  const sub = useSubscription(MESSAGES_SUBSCRIPTION, {
    variables: {
      id,
    },
  })
//   if (sub.loading) console.log('SUBBBBBB')
//   if (sub.data) console.log('SUBBBBBB', sub.data)
//   if (sub.error) console.log('SUBBBBBB', sub.error)
  const [msgMut] = useMutation(MESSAGES_SEND)
//   if (data) console.log('DATA', data)
  const classes = useStyles()
  const [inputField, setInputField] = useState({
    body: '',
  })
  const onChangeInput = ({ target: { name, value } }) => {
    setInputField({ ...inputField, [name]: value })
  }
  const sendMsg = () => {
    // console.log('send', inputField)
    msgMut({ variables: { ...inputField } })
      .then((res) => {
        // console.log('REEEEEEEEEEEEES', res)
        setInputField({ ...inputField, body: '' })
        return props.handleSnk('Message sent')
      })
      .catch((err) => {
        setInputField({ ...inputField, body: '' })
        return props.handleSnk(`${err}`, 'error')
      })
  }
  // eslint-disable-next-line
  useEffect(() => {
    if (!inputField.sender)
      setInputField({
        ...inputField,
        sender: JwtDecode(localStorage.getItem('authorization')).user.id,
        id,
      })

    // console.log(inputField)
  })

  return (
    <>
      <Drawer
        anchor='right'
        className={classes.chat}
        variant='permanent'
        classes={{
          paper: classes.chatPaper,
        }}>
        <Toolbar />
        <div
          className={classes.chatContainer}
          style={{ width: '100%', height: '100%' }}>
          <Box
            style={{ backgroundColor: 'grey' }}
            width={'100%'}
            height={'96.5%'}>
            <List>
              {data ? (
                data.messages.map((v, i) => {
                  return (
                    <ListItem key={i}>
                      <Paper style={{ width: '100%' }}>
                        <Box p={1}>
                          {v.sender.username}: {v.body}
                        </Box>
                      </Paper>
                    </ListItem>
                  )
                })
              ) : (
                <CircularProgress />
              )}
            </List>
          </Box>
          <TextField
            onChange={(e) => onChangeInput(e)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) sendMsg()
            }}
            value={inputField['body']}
            type='text'
            name='body'
            placeholder='Enter Message!'
            fullWidth
            style={{ width: '100%' }}></TextField>
          <IconButton
            onClick={() => sendMsg()}
            className={classes.dropDownZ}
            style={{
              position: 'fixed',
              bottom: -5,
              right: 2,
            }}>
            <ArrowForward />
          </IconButton>
        </div>
      </Drawer>
    </>
  )
}
