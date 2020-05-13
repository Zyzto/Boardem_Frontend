import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useStyles from './Theme'
import { CircularProgress, Box } from '@material-ui/core'
import { Link } from 'react-router-dom'

const get_room_count = gql`
  query RoomCount($id: ID!) {
    roomCount(id: $id)
  }
`

export default ({ props: { id, name, img, time, playersLimit } }) => {
  const { loading, error, data } = useQuery(get_room_count, {
    variables: { id },
  })
  const classes = useStyles()
  if (loading) return <CircularProgress />
  if (error) return <>ERROR</>
  //   console.log(props)
  return (
    <Card className={classes.cardRoot} display='flex'>
      <CardActionArea>
        <CardMedia className={classes.media} image={img} title={name} />
        <Box display='flex' p={1} justifyContent='space-between'>
          <Typography variant='subtitle1'>
            <span role='img' aria-label='player count'>
              🕹️
            </span>
            {playersLimit}P
          </Typography>
          <Typography variant='subtitle1'>
            <span role='img' aria-label='time'>
              ⏱️
            </span>
            {time}Sec
          </Typography>
        </Box>
        <CardContent hight={80}>
          <Typography noWrap gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          textAlign='center'
          display='flex'
          alignItems='flex-end'
          justifyContent='center'>
          <Button
            component={Link}
            to={`/room/browse/${id}`}
            size='small'
            color='primary'>
            Rooms Available {data.roomCount}
          </Button>
          <Button
            component={Link}
            to={`/room/new/${id}`}
            size='small'
            color='primary'>
            New Room
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// })
