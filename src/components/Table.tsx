import * as React from 'react';
import styled from 'styled-components';

import Button from './Button';

interface ILookup {
  [key: string]: string | number | null;
}

interface IAction<T> {
  text: string;
  onClick: (row: T) => void;
}

interface IProps<T> {
  data: T[];
  headers: string[];
  actionForRow?: (row: T) => IAction<T>;
}

class Table<T> extends React.Component<IProps<T>> {
  public render() {
    const { data, headers, actionForRow } = this.props;

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            {actionForRow && <th />}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const action = actionForRow && actionForRow(row);

            return (
              <tr key={rowIndex}>
                {headers.map((header, columnIndex) => (
                  <TableCell key={columnIndex}>
                    {((row as unknown) as ILookup)[header]}
                  </TableCell>
                ))}
                {action && (
                  <td style={{ textAlign: 'right' }}>
                    <Button
                      text={action.text}
                      onClick={() => action.onClick(row)}
                    />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const TableCell = styled.td`
  vertical-align: middle !important;
`;

export default Table;
