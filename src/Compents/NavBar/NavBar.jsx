import clsx from 'clsx'
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  Typography,
  Drawer,
  ListItemText,
  ListItemIcon,
  ListItem,
  List,
  Divider,
  Box,
} from '@material-ui/core'
import {
  ChevronRight,
  ChevronLeft,
  AccountCircle,
  AddCircle,
  Search,
  Assignment,
  Help,
} from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import useStyles from '../Theme/Theme'

import React, { useState } from 'react'
import DropDownAcc from './DropDownAcc'
import { Link } from 'react-router-dom'

export const NavBar = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  // const [, setAnchorEl] = useState(null)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }


  return (
    <>
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, classes.root, {
          [classes.appBarShift]: open,
        })}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ textDecoration: 'none', color: 'white' }}
            component={Link}
            to='/'
            variant='h6'
            noWrap
            className={classes.root}>
            Boardem
          </Typography>
          <DropDownAcc handleSnk={props.handleSnk} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            'My Profile',
            'New Room',
            'Browse Rooms',
            'Leaderboards',
            'Support',
          ].map((text, index) => (
            <ListItem button key={text}>
              <Box ml={0.5}>
                <ListItemIcon>
                  {index === 0 ? <AccountCircle fontSize='large' /> : null}
                  {index === 1 ? <AddCircle fontSize='large' /> : null}
                  {index === 2 ? <Search fontSize='large' /> : null}
                  {index === 3 ? <Assignment fontSize='large' /> : null}
                  {index === 4 ? <Help fontSize='large' /> : null}
                </ListItemIcon>
              </Box>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  )
}
