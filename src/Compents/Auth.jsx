import React, { useState } from 'react'
import {
  Card,
  FormControl,
  Input,
  TextField,
  Box,
  Divider,
  Button,
  Grid,
  List,
  ListItem,
} from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './Theme'
import { gql, useQuery, useMutation } from '@apollo/client'

const registerQGL = gql`
  mutation {
    Register(username: String, email: String, password: String) {
      id
    }
  }
`
const loginQGL = gql`
  mutation {
    login(userInput: String, password: String) {
      token
    }
  }
`
export default () => {
  const [isReg, setIsReg] = useState(false)
  const [inputField, setInputField] = useState()
  const classes = useStyles()
  const [regMut, regData] = useMutation(registerQGL)
  const [logMut, logRes] = useMutation(loginQGL)

  const onChangeInput = ({ target: { name, value } }) => {
    setInputField({ ...inputField, [name]: value })
  }

  const loginHandler = async () => {
    console.log('hello')
    await logMut({ variables: { ...inputField } })
    if (logRes.error) return console.log(logRes.error)
    console.log(logRes.data)
  }

  console.log(inputField)
  return (
    <List>
      <FormControl>
        <ListItem>
          <TextField
            label={isReg ? 'Username' : 'Username or Email'}
            type='username'
            name={isReg ? 'username' : 'userInput'}
            onChange={(e) => onChangeInput(e)}></TextField>
        </ListItem>
        {isReg ? (
          <>
            <ListItem>
              <TextField
                label='Email'
                type='email'
                name='email'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
          </>
        ) : (
          <></>
        )}
        <ListItem>
          <TextField
            label='Password'
            type='password'
            name='password'
            onChange={(e) => onChangeInput(e)}></TextField>
        </ListItem>
        {isReg ? (
          <>
            <ListItem>
              <TextField
                label='Password Confirm'
                type='password'
                name='password-confirm'
                onChange={(e) => onChangeInput(e)}></TextField>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem>
              <Box display='flex' justifyContent='center'>
                <Button p={1} onClick={() => loginHandler()}>
                  Login
                </Button>
                <Button p={1} onClick={() => setIsReg(true)}>
                  Register
                </Button>
              </Box>
            </ListItem>
          </>
        )}
      </FormControl>
    </List>
  )
}
