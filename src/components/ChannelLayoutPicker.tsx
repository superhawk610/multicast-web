import * as React from 'react';
import styled from 'styled-components';
import chunk = require('lodash.chunk');

import { Row, Column } from './Grid';
import Well from './Well';

import { COLORS } from '../constants';

import { ChannelLayout } from '../reducers/channels.reducer';

interface ILayoutProps {
  onClick: () => void;
}

const SingleLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr" templateRows="1fr">
    <LayoutSection>URL 1</LayoutSection>
  </LayoutPreview>
);

const EvenVerticalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr" templateRows="1fr 1fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const EvenHorizontalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr 1fr" templateRows="1fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const OneTwoVerticalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr" templateRows="1fr 2fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const OneTwoHorizontalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr 2fr" templateRows="1fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const TwoOneVerticalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="1fr" templateRows="2fr 1fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const TwoOneHorizontalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview onClick={onClick} templateColumns="2fr 1fr" templateRows="1fr">
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
  </LayoutPreview>
);

const OneOneTwoVerticalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview
    onClick={onClick}
    templateColumns="1fr 1fr"
    templateRows="1fr 1fr"
  >
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
    <LayoutSection startColumn={1} endColumn={3} startRow={2} endRow={2}>
      URL 3
    </LayoutSection>
  </LayoutPreview>
);

const OneOneTwoHorizontalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview
    onClick={onClick}
    templateColumns="1fr 1fr"
    templateRows="1fr 1fr"
  >
    <LayoutSection>URL 1</LayoutSection>
    <LayoutSection startColumn={1} endColumn={2} startRow={2} endRow={2}>
      URL 2
    </LayoutSection>
    <LayoutSection startColumn={2} endColumn={2} startRow={1} endRow={3}>
      URL 3
    </LayoutSection>
  </LayoutPreview>
);

const TwoOneOneVerticalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview
    onClick={onClick}
    templateColumns="1fr 1fr"
    templateRows="1fr 1fr"
  >
    <LayoutSection startColumn={1} endColumn={3} startRow={1} endRow={1}>
      URL 1
    </LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
    <LayoutSection>URL 3</LayoutSection>
  </LayoutPreview>
);

const TwoOneOneHorizontalSplitLayout = ({ onClick }: ILayoutProps) => (
  <LayoutPreview
    onClick={onClick}
    templateColumns="1fr 1fr"
    templateRows="1fr 1fr"
  >
    <LayoutSection startColumn={1} endColumn={1} startRow={1} endRow={3}>
      URL 1
    </LayoutSection>
    <LayoutSection>URL 2</LayoutSection>
    <LayoutSection>URL 3</LayoutSection>
  </LayoutPreview>
);

interface IProps {
  layout: ChannelLayout;
  onChange: (layout: ChannelLayout) => void;
  children?: React.ReactNode;
}

interface IState {
  active: boolean;
}

interface IChannelLayoutMapping {
  [layout: string]: { Component: React.SFC<any>; value: ChannelLayout };
}

class ChannelLayoutPicker extends React.Component<IProps, IState> {
  public state: IState = {
    active: false,
  };

  private channelLayouts: IChannelLayoutMapping = {
    single: { Component: SingleLayout, value: 'single' },
    '1-1-vertical': {
      Component: EvenVerticalSplitLayout,
      value: '1-1-vertical',
    },
    '1-1-horizontal': {
      Component: EvenHorizontalSplitLayout,
      value: '1-1-horizontal',
    },
    '1-2-vertical': {
      Component: OneTwoVerticalSplitLayout,
      value: '1-2-vertical',
    },
    '1-2-horizontal': {
      Component: OneTwoHorizontalSplitLayout,
      value: '1-2-horizontal',
    },
    '2-1-vertical': {
      Component: TwoOneVerticalSplitLayout,
      value: '2-1-vertical',
    },
    '2-1-horizontal': {
      Component: TwoOneHorizontalSplitLayout,
      value: '2-1-horizontal',
    },
    '2-1-1-vertical': {
      Component: OneOneTwoVerticalSplitLayout,
      value: '2-1-1-vertical',
    },
    '2-1-1-horizontal': {
      Component: OneOneTwoHorizontalSplitLayout,
      value: '2-1-1-horizontal',
    },
    '1-1-2-vertical': {
      Component: TwoOneOneVerticalSplitLayout,
      value: '1-1-2-vertical',
    },
    '1-1-2-horizontal': {
      Component: TwoOneOneHorizontalSplitLayout,
      value: '1-1-2-horizontal',
    },
  };

  public render() {
    const { layout, onChange, children } = this.props;
    const { active } = this.state;

    const ActiveLayoutComponent = this.channelLayouts[layout].Component;
    const rows = chunk(
      Object.keys(this.channelLayouts).map(key => this.channelLayouts[key]),
      3,
    );
    const onClick = (value: ChannelLayout) => () => onChange(value);

    return (
      <>
        <label className="label">Channel Layout</label>
        <Row>
          <Column width={4}>
            <ActiveLayoutComponent />
          </Column>
          <Column>{children}</Column>
        </Row>
        <Well>
          <label className="label">Select A Layout</label>
          {rows.map((row, rowIndex) => (
            <Row key={rowIndex}>
              {row.map(({ Component, value }, layoutIndex) => (
                <Column key={layoutIndex} width={4}>
                  <Component onClick={onClick(value)} />
                </Column>
              ))}
            </Row>
          ))}
        </Well>
      </>
    );
  }
}

const LayoutSection = styled.div<{
  startColumn?: number;
  endColumn?: number;
  startRow?: number;
  endRow?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${COLORS.grey};
  background: ${COLORS.greyTint};
  ${props =>
    props.startColumn &&
    `
    grid-column-start: ${props.startColumn};
    grid-column-end: ${props.endColumn};
    grid-row-start: ${props.startRow};
    grid-row-end: ${props.endRow};
  `};
`;

const LayoutPreview = styled.div<{
  templateColumns: string;
  templateRows: string;
}>`
  display: grid;
  grid-template-columns: ${props => props.templateColumns};
  grid-template-rows: ${props => props.templateRows};
  border: 4px solid ${COLORS.grey};
  border-radius: 4px;
  height: 200px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px ${COLORS.green};
    border-color: ${COLORS.green};

    > ${LayoutSection} {
      border-color: ${COLORS.green};
      background: ${COLORS.greenTint};
      color: ${COLORS.green};
    }
  }
`;

export default ChannelLayoutPicker;
