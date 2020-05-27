import styled from 'styled-components'

export const Container = styled.div`
  text-align: center;
  margin-top: 20px;
`

export const Table = styled.table`
  border-collapse: collapse;
  margin: 20px auto;
`

export const TBody = styled.tbody``

export const TableRow = styled.tr`
  background-color: ${props => props.isEven ? '#EEEEEE' : '#FFFFFF'};
  border: 1px solid #dddddd;
  height: 35px;
`

export const TableData = styled.td`
  border: 1px solid #dddddd;
  font-weight: ${props => props.isKey ? 'bold' : 'initial'}
`