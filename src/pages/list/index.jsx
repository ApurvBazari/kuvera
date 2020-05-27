import React from 'react'

import Table from '../../components/table'
import Search from '../../components/search'

import { Container } from './style'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      error: null,
      tableData: null,
      sOrder: null,
      sortBy: null,
      searchVal: ''
    }
  }

  componentDidMount = () => {
    fetch('https://api.kuvera.in/api/v3/funds.json')
      .then(res => res.json())
      .then(data => this.setState({data, tableData: data.slice(0, 100)}))
      .catch(error => this.setState({error}))
  }

  dynamicSort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
      var result
      if(property === 'year_1' || property === 'year_3')
        result = (a.returns[property] < b.returns[property]) ? -1 : (a.returns[property] > b.returns[property]) ? 1 : 0;
      else
        result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  onSort = (target) => {
    let { sOrder, data, searchVal, searchData } = this.state;
    let tempData = searchVal === '' ? data : searchData;
    let newOrder = tempData.slice(0).sort(sOrder === 'desc' ? this.dynamicSort(`-${target}`) : this.dynamicSort(target))
    this.setState({
      sOrder: sOrder === 'desc' ? 'asc' : 'desc',
      tableData: newOrder.slice(0, 100),
      sortBy: target
    })
  }

  onInputChange = (value) => {
    this.setState({searchVal: value})
  }

  searchValue = () => {
    const { searchVal, data } = this.state;
    let newData = data.filter(val => val.name.toLowerCase().search(searchVal.toLowerCase()) > -1)
    this.setState({
      searchData: newData,
      tableData: newData.slice(0, 100)
    })
  }

  render() {
    const { tableData, sortBy, sOrder } = this.state
    console.log(sOrder)
    console.log(sortBy)
    return(
      <Container>
        <Search onInputChange={this.onInputChange} searchValue={this.searchValue} />
        {tableData && (
          <Table
            onSort={this.onSort}
            sortBy={sortBy}
            data={tableData}
          />
        )}
      </Container>
    )
  }
}