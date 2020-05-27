import React from 'react'

import { Container, Input, Button } from './style'

const Search = (props) => {
  return(
    <Container>
      <Input type="text" onChange={(e) => props.onInputChange(e.target.value)} />
      <Button onClick={props.searchValue}>Search</Button>
    </Container>
  )
}

export default Search