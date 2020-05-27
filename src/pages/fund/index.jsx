import React from 'react'
import { withRouter } from 'react-router-dom'

import { Container } from './style'

class Fund extends React.Component {
  render() {
    const { match } = this.props;
    console.log(match.params.fundCode)
    return(
      <Container>
        Details Page
      </Container>
    )
  }
}

const Details = withRouter(Fund);
export default Details
