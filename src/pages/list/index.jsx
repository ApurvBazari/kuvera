import React from 'react'

import Table from '../../components/table'
import Search from '../../components/search'

import { Container, Button, PageNum, Pagination } from './style'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
      tableData: null,
      sOrder: null,
      sortBy: null,
      searchData: null,
      searchVal: '',
      currentIndex: 1
    }
  }

  componentDidMount = () => {
    fetch('https://api.kuvera.in/api/v3/funds.json')
      .then(res => res.json())
      .then(data => this.setState({data, tableData: data.slice(0, 100), tempData: data}))
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
    let tempData = searchVal === '' ? [...data] : [...searchData];
    let newOrder = tempData.slice(0).sort(sOrder === 'desc' ? this.dynamicSort(`-${target}`) : this.dynamicSort(target))
    this.setState({
      sOrder: sOrder === 'desc' ? 'asc' : 'desc',
      tableData: newOrder.slice(0, 100),
      sortBy: target,
      tempData: newOrder
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
      tempData: newData,
      tableData: newData.slice(0, 100),
      currentIndex: 1
    })
  }

  nameClicked = code => {
    window.location.assign(`/explore/${code}`)
  }

  prevClick = () => {
    const { currentIndex, tempData } = this.state;
    this.setState({
      // tableData: tempData.slice(currentIndex*100+1, ((currentIndex+1)*100)),
      tableData: tempData.slice(((currentIndex-2)*100), ((currentIndex-1)*100)),
      currentIndex: currentIndex - 1
    })
  }

  nextClick = () => {
    const { currentIndex, tempData } = this.state;
    this.setState({
      tableData: tempData.slice(currentIndex*100+1, ((currentIndex+1)*100)),
      currentIndex: currentIndex + 1
    })
  }

  render() {
    const { tableData, sortBy, data, searchData, currentIndex } = this.state
    console.log(searchData);
    let tempData = !searchData ? [...data] : [...searchData];
    const showPrev = currentIndex > 1;
    const showNext = tempData.length > 100*currentIndex
    return(
      <Container>
        <Search onInputChange={this.onInputChange} searchValue={this.searchValue} />
        {tableData && (
          <Table
            onSort={this.onSort}
            nameClicked={this.nameClicked}
            sortBy={sortBy}
            data={tableData}
          />
        )}
        {tableData && (
          <Pagination>
            {showPrev && <Button onClick={this.prevClick}>Prev</Button>}
            <PageNum>{currentIndex}/{Math.ceil(tempData.length/100)}</PageNum>
            {showNext && <Button onClick={this.nextClick}>Next</Button>}
          </Pagination>
        )}
      </Container>
    )
  }
}