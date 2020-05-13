import React, { useState } from 'react'
import clsx from 'clsx'
import useStyles from './Compents/Theme'
import './App.css'
import { spacing } from '@material-ui/system'
import {
  Typography,
  List,
  Divider,
  Snackbar,
  Grid,
  Container,
} from '@material-ui/core'
import {} from '@material-ui/icons'
import { NavBar } from './Compents/NavBar'
import { useQuery, gql } from '@apollo/client'
import Alert from '@material-ui/lab/Alert'
import HomeGQL from './Compents/HomeGQL'
import { Route, Switch } from 'react-router-dom'
import Account from './Compents/Account'
import RoomNew from './Compents/RoomNew'
import RoomBrowse from './Compents/RoomBrowse'
// import MuiAlert from '@material-ui/lab/Alert'

const get_users = gql`
  {
    users {
      id
      isAdmin
    }
  }
`
// function Alert(props) {
//   return <MuiAlert elevation={6} variant='filled' {...props} />
// }

export default () => {
  const classes = useStyles()
  // const { loading, error, data } = useQuery(get_users)
  const [opnSnk, setopnSnk] = useState(false)
  const [snkMsg, setSnkMsg] = useState(false)
  const [snkType, setSnkType] = useState()

  const handleSnk = (msg, type) => {
    console.log(msg)
    setopnSnk(true)
    setSnkMsg(msg)
    setSnkType(type)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setSnkMsg()
    setopnSnk(false)
    setTimeout(() => {
      setSnkType()
    }, 200)
  }

  // if (loading && !snkMsg && !data) handleSnk('Loading...', 'info')
  // if (data && snkMsg === 'Loading...')
  //   setTimeout(() => {
  //     handleClose()
  //   }, 200)
  // if (error && (!snkMsg || snkMsg === 'Loading...'))
  //   handleSnk(error.message, 'error')

  return (
    <div className='App'>
      <header>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </header>
      <NavBar handleSnk={handleSnk} />
      <main className={classes.content}>
        <Container maxWidth='sm' className={classes.toolbar} />
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/account'>
            <Account handleSnk={handleSnk} />
          </Route>
          <Route path='/room/new/:id'>
            <RoomNew handleSnk={handleSnk} />
          </Route>
          <Route exact path='/room/browse/:game'>
            <RoomBrowse handleSnk={handleSnk} />
          </Route>
          <Route exact path='/'>
            <HomeGQL />
          </Route>
        </Switch>

        {/* <List>
          {data
            ? data.users.map((v, i) => (
                <div key={i}>
                  <Typography>{v.id}</Typography>
                  <Typography>{v.isAdmin}</Typography>
                  <Divider />
                </div>
              ))
            : null}
        </List> */}
      </main>
      <Snackbar open={opnSnk} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snkType}>
          {snkMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}
