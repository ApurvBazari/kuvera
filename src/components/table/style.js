import styled from 'styled-components'

export const Container = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  background-color: ${props => props.isHead ? 'black' : props.isEven ? '#EEEEEE' : '#FFFFFF'};
  height: ${props => props.isHead ? '50px' : '35px'};
  border: 1px solid #dddddd;
`;

export const THead = styled.thead ``;

export const TBody = styled.tbody ``;

export const TableHead = styled.th`
  color: white;
  border: 1px solid #dddddd;
  cursor: pointer;
`;

export const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: center;
  cursor: ${props => props.pointer ? 'pointer' : 'initial'};

  &:hover {
    text-decoration: ${props => props.pointer ? 'underline' : 'initial'}
  }
`;