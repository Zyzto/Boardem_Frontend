import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import {
  List,
  CircularProgress,
  ListItem,
  Typography,
  Paper,
  Box,
  Grid,
} from '@material-ui/core'

const get_game_rooms = gql`
  query($game: ID!) {
    gameRooms(game: $game) {
      id
      password
      players {
        username
      }
    }
    game(id: $game) {
      name
      img
      playersLimit
    }
  }
`

export default (props) => {
  const { game } = useParams()
  const { loading, error, data } = useQuery(get_game_rooms, {
    variables: {
      game,
    },
  })
  // if (data) console.log(data)
  if (error) return <>ERROR</>
  return (
    <>
      <List>
        {data ? (
          data.gameRooms.map((v, i) => {
            return (
              <ListItem key={i}>
                <Paper
                  component={Link}
                  to={`/room/join/${v.id}`}
                  style={{
                    justifyItems: 'center',
                    alignItems: 'center',
                    padding: '2%',
                    width: '100%',
                    textDecoration: 'none',
                    color: 'black',
                  }}>
                  <Grid
                    container
                    style={{
                      justifyItems: 'center',
                      alignItems: 'center',
                    }}>
                    <Grid item xs={2}>
                      <img
                        width={80}
                        height={80}
                        src={data.game.img}
                        alt={data.game.name}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant={'h3'}>{data.game.name}</Typography>
                    </Grid>
                    <Grid item xs={2} style={{ justifySelf: 'end' }}>
                      <Typography variant='h4'>
                        <span role='img' aria-label='player count'>
                          🕹️
                        </span>
                        {data.game.playersLimit}/{v.players.length}P
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </ListItem>
            )
          })
        ) : (
          <CircularProgress />
        )}
      </List>
    </>
  )
}
