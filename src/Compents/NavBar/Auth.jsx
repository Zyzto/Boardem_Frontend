import React, { useState } from 'react'
import {
  FormControl,
  TextField,
  Box,
  Button,
  List,
  ListItem,
} from '@material-ui/core'
import useStyles from '../Theme/Theme'
import { gql, useMutation } from '@apollo/client'

const registerQGL = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
    }
  }
`
const loginQGL = gql`
  mutation Login($userInput: String!, $password: String!) {
    login(userInput: $userInput, password: $password) {
      token
    }
  }
`
export default (props) => {
  const [isReg, setIsReg] = useState(false)
  const [inputField, setInputField] = useState({})
  const [regMut] = useMutation(registerQGL)
  const [logMut] = useMutation(loginQGL)
  const [] = useState()

  const onChangeInput = ({ target: { name, value } }) => {
    setInputField({ ...inputField, [name]: value })
  }

  const loginHandler = async () => {
    // console.log({ ...inputField })
    await logMut({
      variables: {
        ...inputField,
      },
    })
      .then((data) => {
        // console.log('DATA ', data.data.login.token)
        props.handleSnk('Logged In')
        props.handleClose(false)
        setTimeout(() => {
          localStorage.setItem('authorization', data.data.login.token)
        }, 300)
      })
      .catch((err) => {
        console.log('ERROR ', err)
        props.handleSnk(`${err}`, 'error')
      })
    // if (ler) return console.log(ler)
    // console.log(lda)
  }
  const registerHandler = async () => {
    // console.log({ ...inputField })
    if (!inputField['username'])
      return props.handleSnk('Username missing', 'error')
    if (!inputField['password'])
      return props.handleSnk('Passwords missing', 'error')
    if (!inputField['email']) return props.handleSnk('Email missing', 'error')
    if (inputField['password'] !== inputField['password-confirm'])
      return props.handleSnk("Passwords aren't matched", 'error')
    await regMut({
      variables: {
        ...inputField,
      },
    })
      .then(async (data) => {
        console.log('DATA ', data.data.register)
        props.handleSnk('Successful Registered!')
        setInputField({})
        props.handleClose(false)
        // setInputField({
        //   userInput: inputField.username,
        //   password: inputField.password,
        // })
        // console.log(inputField)
        // loginHandler()
      })
      .catch((err) => {
        console.log('ERROR ', err)
        props.handleSnk(`${err}`, 'error')
      })
    // if (ler) return console.log(ler)
    // console.log(lda)
  }

  const switchToReg = () => {
    setIsReg(true)
    if (inputField.userInput)
      setInputField({
        username: inputField.userInput,
      })
    if (inputField.password)
      setInputField({
        password: inputField.password,
      })
  }
  // console.log(inputField)
  return (
    <>
      {isReg ? (
        <>
          <List>
            <FormControl>
              <ListItem>
                <TextField
                  label={'Username'}
                  type='username'
                  name={'username'}
                  onChange={(e) => onChangeInput(e)}></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  onChange={(e) => onChangeInput(e)}></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  label='Password Confirm'
                  type='password'
                  name='password-confirm'
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
                <Box display='flex' justifyContent='center'>
                  <Button p={1} onClick={() => setIsReg(false)}>
                    Login
                  </Button>
                  <Button p={1} onClick={() => registerHandler()}>
                    Register
                  </Button>
                </Box>
              </ListItem>
            </FormControl>
          </List>
        </>
      ) : (
        <>
          <List>
            <FormControl>
              <ListItem>
                <TextField
                  label={'Username or Email'}
                  type='username'
                  name={'userInput'}
                  onChange={(e) => onChangeInput(e)}></TextField>
              </ListItem>
              <ListItem>
                <TextField
                  label='Password'
                  type='password'
                  name='password'
                  onChange={(e) => onChangeInput(e)}></TextField>
              </ListItem>
              <ListItem>
                <Box display='flex' justifyContent='center'>
                  <Button p={1} onClick={() => loginHandler()}>
                    Login
                  </Button>
                  <Button p={1} onClick={() => switchToReg()}>
                    Register
                  </Button>
                </Box>
              </ListItem>
            </FormControl>
          </List>
        </>
      )}
    </>
  )
}
