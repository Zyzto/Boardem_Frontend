import React from 'react'
import { useQuery, gql } from '@apollo/client'
import GameCard from './GameCard'
import { CircularProgress, Grid, Box } from '@material-ui/core'
import useStyles from './Theme'

const get_games = gql`
  {
    games {
      id
      name
      time
      playersLimit
      img
    }
  }
`

export default () => {
  const { loading, error, data } = useQuery(get_games)
  const classes = useStyles()
  if (loading) return <CircularProgress />
  if (error) return <>ERROR {error}</>
  return (
    <Grid container spacing={2} justify='center' alignContent='center'>
      {data.games.map((v, i) => {
        // console.log(v)
        return (
          <Grid style={{ width: 250, height: 500 }} item key={i}>
            <Box>
              <GameCard props={v} />
            </Box>
          </Grid>
        )
      })}
    </Grid>
  )
}
