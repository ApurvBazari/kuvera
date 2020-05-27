import React from 'react'
import { withRouter } from 'react-router-dom'

import { Container, Table, TableData, TableRow, TBody } from './style'

class Fund extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    const { match } = this.props;
    fetch(`https://api.kuvera.in/api/v3/funds/${match.params.fundCode}.json`)
      .then(res => res.json())
      .then(data => this.setState({data}))
      .catch(err => console.log('Error:', err))
  }
  
  render() {
    const { data } = this.state
    if(!!data) {
      console.log(data[0])
    }
    const fundData = !!data ? data[0] : null
    return(
      fundData && <Container>
        {`Details for ${fundData.name}`}
          <Table>
            <TBody>
              <TableRow isEven>
                <TableData isKey>ISIN Number</TableData>
                <TableData>{fundData.ISIN}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Category</TableData>
                <TableData>{fundData.category}</TableData>
              </TableRow>
              <TableRow isEven>
                <TableData isKey>Crisil Rating</TableData>
                <TableData>{fundData.crisil_rating}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Fund Category</TableData>
                <TableData>{fundData.fund_category}</TableData>
              </TableRow>
              <TableRow isEven>
                <TableData isKey>Fund House</TableData>
                <TableData>{fundData.fund_house}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Fund Name</TableData>
                <TableData>{fundData.fund_name}</TableData>
              </TableRow>
              <TableRow isEven>
                <TableData isKey>Fund Type</TableData>
                <TableData>{fundData.fund_type}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Investment Objective</TableData>
                <TableData>{fundData.investment_objective}</TableData>
              </TableRow>
              <TableRow isEven>
                <TableData isKey>Maturity Type</TableData>
                <TableData>{fundData.maturity_type}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Fund Plan</TableData>
                <TableData>{fundData.plan}</TableData>
              </TableRow>
              <TableRow isEven>
                <TableData isKey>Portfolio TurnOver</TableData>
                <TableData>{fundData.portfolio_turnover}</TableData>
              </TableRow>
              <TableRow>
                <TableData isKey>Volatility</TableData>
                <TableData>{fundData.volatility}</TableData>
              </TableRow>
            </TBody>
          </Table>
      </Container>
    )
  }
}

const Details = withRouter(Fund);
export default Details
