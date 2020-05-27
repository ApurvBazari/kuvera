import React from 'react'

import { Container, TableRow, TableHead, TableData, THead, TBody } from './style'

const Table = (props) => {
  return(
    <Container>
      <THead>
        <TableRow isHead>
          <TableHead onClick={() => props.onSort('name')}>Name</TableHead>
          <TableHead onClick={() => props.onSort('category')}>Category</TableHead>
          <TableHead onClick={() => props.onSort('fund_type')}>Type</TableHead>
          <TableHead onClick={() => props.onSort('plan')}>Plan</TableHead>
          <TableHead onClick={() => props.onSort('year_1')}>1 Year Return</TableHead>
          <TableHead onClick={() => props.onSort('year_3')}>3 Year Return</TableHead>
        </TableRow>
      </THead>
      <TBody>
        {props.data.map((col, i) => 
          <TableRow key={col.name+i} isEven={i%2===0}>
            <TableData pointer onClick={() => props.nameClicked(col.code)}>{col.name}</TableData>
            <TableData>{col.category}</TableData>
            <TableData>{col.fund_type}</TableData>
            <TableData>{col.plan}</TableData>
            <TableData>{col.returns.year_1}</TableData>
            <TableData>{col.returns.year_3}</TableData>
          </TableRow>
        )}
      </TBody>
    </Container>
  )
}

export default Table