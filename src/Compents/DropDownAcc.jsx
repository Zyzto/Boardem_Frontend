import React, { useState, useRef } from 'react'
import {
  IconButton,
  Menu,
  MenuItem,
  Button,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import Auth from './Auth'
import useStyles from './Theme'
import { Link } from 'react-router-dom'



export default (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
  }
  const handleCloseLogin = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false)
    setTimeout(() => {
      localStorage.removeItem('authorization')
    }, 700)
  }
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])
  return (
    <div>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup='true'
        onClick={handleToggle}>
        <AccountCircle />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement='bottom-end'
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: false,
            boundariesElement: 'scrollParent',
          },
        }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center bottom' : 'center top',
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id='menu-list-grow'
                  onKeyDown={handleListKeyDown}>
                  {localStorage.getItem('authorization') ? (
                    <div>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem
                        onClick={handleClose}
                        component={Link}
                        to={'/account'}>
                        My Account
                      </MenuItem>
                      <MenuItem onClick={handleCloseLogin}>Logout</MenuItem>
                    </div>
                  ) : (
                    <Auth handleClose={setOpen} handleSnk={props.handleSnk} />
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
