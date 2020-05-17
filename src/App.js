import React, { useState } from 'react'
import useStyles from './Compents/Theme/Theme'
import './App.css'
import { Snackbar, Container } from '@material-ui/core'
import {} from '@material-ui/icons'
import { NavBar } from './Compents/NavBar/NavBar'
import Alert from '@material-ui/lab/Alert'
import HomeGQL from './Compents/Game/HomeGQL'
import { Route, Switch } from 'react-router-dom'
import Account from './Compents/Account/Account'
import RoomNew from './Compents/Room/RoomNew'
import RoomBrowse from './Compents/Room/RoomBrowse'
import RoomGame from './Compents/Room/RoomGame'
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
        <Switch>
          <Route path='/account'>
            <Account handleSnk={handleSnk} />
          </Route>
          <Route path='/room/new/:id'>
            <RoomNew handleSnk={handleSnk} />
          </Route>
          <Route exact path='/room/join/:id'>
            <RoomGame handleSnk={handleSnk} />
          </Route>
          <Route exact path='/room/browse/:game'>
            <RoomBrowse handleSnk={handleSnk} />
          </Route>
          <Route exact path='/'>
            <HomeGQL />
          </Route>
        </Switch>
      </main>
      <Snackbar open={opnSnk} autoHideDuration={8000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snkType}>
          {snkMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}
