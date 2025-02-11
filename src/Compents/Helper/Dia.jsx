import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default (props) => {
  const [open, setOpen] = React.useState(true)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>{`${props.title}`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {`${props.msg}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            No
          </Button>
          <Button
            onClick={() => {
              handleClose()
              props.func()
            }}
            color='primary'
            autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
