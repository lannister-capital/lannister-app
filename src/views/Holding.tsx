import React from 'react'
// import styled from 'styled-components'
import db from '../db'

const Holding = props => {
  const id = props.match.params.id
  const holding = db
    .get('holdings')
    .find({ id: id })
    .value()

  return (
    <div>
      <h1>{holding.name}</h1>
    </div>
  )
}

export default Holding
