import * as React from 'react';
import styled from 'styled-components';

import Heading, { Heading2 } from './Heading';

interface IProps {
  heading?: string;
  subheading?: string;
  children: React.ReactNode;
}
const Page = ({ heading, subheading, children, ...delegated }: IProps) => (
  <Container {...delegated}>
    {heading && <Heading>{heading}</Heading>}
    {subheading && <Heading2>{subheading}</Heading2>}
    {children}
  </Container>
);

const Container = styled.div`
  padding: 25px;
  padding-left: 275px;
`;

export default Page;
