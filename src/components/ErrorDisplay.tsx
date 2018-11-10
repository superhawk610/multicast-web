import * as React from 'react';
import styled from 'styled-components';

import { Heading2 } from './Heading';

import Icon from 'react-icons-kit';
import { alertCircle } from 'react-icons-kit/feather/alertCircle';

import { COLORS } from '../constants';

import {
  APIError,
  ECONNREFUSED,
  ENOTFOUND,
} from '../middlewares/api.middleware';
import PixelShifter from './PixelShifter';

interface IProps {
  error: APIError | Error;
}

const messageForError = (error: APIError | Error) => {
  const code = error instanceof APIError ? error.code : null;

  switch (code) {
    case ECONNREFUSED:
      return (
        <>
          <strong>The connection was refused.</strong> Check your firewall
          settings and make sure the host is reachable and target port is open.
        </>
      );
    case ENOTFOUND:
      return (
        <>
          <strong>The host could not be found.</strong> Make sure you spelled
          the name correctly and the network is reachable.
        </>
      );
    default:
      return error.message;
  }
};

const ErrorDisplay = ({ error }: IProps) => (
  <Container>
    <ErrorHeading>
      <PixelShifter up={2}>
        <Icon icon={alertCircle} size={24} style={{ marginRight: '5px' }} />
      </PixelShifter>
      <span>Oops! We encountered an error.</span>
    </ErrorHeading>
    {messageForError(error)}
  </Container>
);

const Container = styled.div`
  padding: 25px;
  margin-bottom: 25px;
`;

const ErrorHeading = styled(Heading2)`
  color: ${COLORS.red};
`;

export default ErrorDisplay;
