import * as React from 'react';
import startCase = require('lodash.startcase');
import styled from 'styled-components';

import Button from './Button';
import ErrorDisplay from './ErrorDisplay';

import { chevronRight } from 'react-icons-kit/feather/chevronRight';

import { COLORS, THEMES, Theme } from '../constants';

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
  loading?: boolean;
  error?: Error | null;
  headers: string[];
  headerLabels?: string[];
  renderRow?: IRenderMapping<T>;
  actionForRow?: (row: T) => IAction<T>;
  actionHeader?: React.ReactNode;
  actionTheme?: Theme;
  noRecordsFoundText?: string;
}

class Table<T> extends React.Component<IProps<T>> {
  public render() {
    const {
      data,
      loading,
      error,
      headers,
      headerLabels,
      renderRow = {},
      actionForRow,
      actionHeader,
      actionTheme = THEMES.success,
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
            {actionForRow && (
              <HeaderCell style={{ textAlign: 'right' }}>
                {actionHeader}
              </HeaderCell>
            )}
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <TableCell colSpan={42}>
                <ErrorDisplay error={error} />
              </TableCell>
            </tr>
          ) : loading ? (
            <tr>
              <TableCell colSpan={42}>
                <div className="with-loading-spinner">Loading...</div>
              </TableCell>
            </tr>
          ) : data.length > 0 ? (
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
                    <ButtonCell>
                      <Button
                        theme={actionTheme}
                        text={action.text}
                        rightIcon={chevronRight}
                        onClick={onClick}
                      />
                    </ButtonCell>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <EmptyTableCell colSpan={42}>{noRecordsFoundText}</EmptyTableCell>
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

const EmptyTableCell = styled.td`
  padding: 1.65em !important;
  vertical-align: middle !important;
  color: ${COLORS.greyLight};
`;

const ButtonCell = styled.td`
  text-align: right;

  > .button {
    height: auto !important;
    padding-top: 1px;
    padding-bottom: 1px;
  }
`;

export default Table;
