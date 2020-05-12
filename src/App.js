import React, { useState } from 'react'
import clsx from 'clsx'
import useStyles from './Compents/Theme'
import './App.css'
import { spacing } from '@material-ui/system'
import { Typography, List, Divider, Snackbar } from '@material-ui/core'
import {} from '@material-ui/icons'
import { NavBar } from './Compents/NavBar'
import { useQuery, gql } from '@apollo/client'
import MuiAlert from '@material-ui/lab/Alert'

const get_users = gql`
  {
    users {
      id
      isAdmin
    }
  }
`
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

function App() {
  const classes = useStyles()
  const { loading, error, data } = useQuery(get_users)
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
    setopnSnk(false)
  }

  const errorHandling = () => {
    if (loading) {
      setopnSnk(true)
      return (
        <Alert onClose={handleClose} severity='info'>
          Loading...
        </Alert>
      )
    }
  }
  if (loading && !snkMsg) handleSnk('Loading...', 'info')
  if (error && (!snkMsg || snkMsg === 'Loading...'))
    handleSnk(error.message, 'error')

  return (
    <div className='App'>
      <header>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </header>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <List>
          {data
            ? data.users.map((v, i) => (
                <div key={i}>
                  <Typography>{v.id}</Typography>
                  <Typography>{v.isAdmin}</Typography>
                  <Divider />
                </div>
              ))
            : null}
        </List>

        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
      <Snackbar open={opnSnk} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snkType}>
          {snkMsg}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default App
