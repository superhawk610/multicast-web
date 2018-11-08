import * as React from 'react';
import startCase = require('lodash.startcase');
import styled from 'styled-components';

import Button from './Button';

import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import { COLORS, THEMES } from '../constants';

interface ILookup {
  [key: string]: string | number | null;
}

interface IAction<T> {
  text: string;
  onClick: (row: T) => void;
}

type Render<T> = (row: T) => React.ReactNode;

interface IRenderMapping<T> {
  [key: string]: Render<T> | undefined;
}

interface IProps<T> {
  data: T[];
  headers: string[];
  headerLabels?: string[];
  renderRow?: IRenderMapping<T>;
  actionForRow?: (row: T) => IAction<T>;
  noRecordsFoundText?: string;
}

class Table<T> extends React.Component<IProps<T>> {
  public render() {
    const {
      data,
      headers,
      headerLabels,
      renderRow = {},
      actionForRow,
      noRecordsFoundText = 'No Records Found.',
    } = this.props;

    return (
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <HeaderCell key={index}>
                {headerLabels ? headerLabels[index] : startCase(header)}
              </HeaderCell>
            ))}
            {actionForRow && <HeaderCell />}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => {
              const action = actionForRow && actionForRow(row);
              const onClick = () => action && action.onClick(row);

              return (
                <tr key={rowIndex}>
                  {headers.map((header, columnIndex) => (
                    <TableCell key={columnIndex}>
                      {renderRow[header]
                        ? (renderRow[header] as Render<T>)(row)
                        : ((row as unknown) as ILookup)[header]}
                    </TableCell>
                  ))}
                  {action && (
                    <td style={{ textAlign: 'right' }}>
                      <Button
                        theme={THEMES.success}
                        text={action.text}
                        rightIcon={chevronRight}
                        onClick={onClick}
                      />
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <TableCell colSpan={42}>{noRecordsFoundText}</TableCell>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

const HeaderCell = styled.th`
  background: ${COLORS.white3};
`;

const TableCell = styled.td`
  vertical-align: middle !important;
`;

export default Table;
