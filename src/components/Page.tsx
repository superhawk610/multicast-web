import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Heading, { Heading2 } from './Heading';

import Icon from 'react-icons-kit';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';

import { IRouteConfiguration } from '../routes';
import PixelShifter from './PixelShifter';

interface IProps {
  heading?: string;
  subheading?: string;
  parent?: IRouteConfiguration;
  children: React.ReactNode;
}
const Page = ({
  heading,
  subheading,
  parent,
  children,
  ...delegated
}: IProps) => (
  <Container {...delegated}>
    {heading && <Heading>{heading}</Heading>}
    {subheading && <Heading2>{subheading}</Heading2>}
    {parent && (
      <Link
        to={parent.path}
        style={{ display: 'block', margin: '-15px 0 15px' }}
      >
        <PixelShifter up={2}>
          <Icon icon={chevronLeft} />
        </PixelShifter>{' '}
        Back to {parent.name}
      </Link>
    )}
    {children}
  </Container>
);

const Container = styled.div`
  padding: 25px;
  padding-left: 275px;
`;

export default Page;
