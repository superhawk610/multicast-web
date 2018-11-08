import * as React from 'react';
import styled from 'styled-components';
import { colorForStatus } from '../utils';

import Box from './Box';
import Well from './Well';
import { Level, LevelLeft, LevelRight, LevelItem } from './Level';
import IconButton from './IconButton';
import StatusLight from './StatusLight';

import HostForm from '../forms/HostForm';

import { chevronDown } from 'react-icons-kit/feather/chevronDown';

import { COLORS } from '../constants';

import { Status } from '../types';

interface IProps {
  id: number;
  address: string;
  nickname: string;
  status: Status;
  version: string;
}

interface IState {
  active: boolean;
}

class Host extends React.Component<IProps, IState> {
  public state = {
    active: false,
  };

  public toggleDetails = () =>
    this.setState(state => ({ active: !state.active }));

  public render() {
    const { id, address, nickname, status, version } = this.props;
    const { active } = this.state;

    return (
      <>
        <Box color={colorForStatus(status)} onClick={this.toggleDetails}>
          <Level>
            <LevelLeft>
              <LevelItem>
                <div className="has-text-centered" style={{ width: '125px' }}>
                  <SmallText>IP ADDRESS</SmallText>
                  <BoldText>{address}</BoldText>
                </div>
              </LevelItem>
              <LevelItem>
                <div>
                  <SmallText>NICKNAME</SmallText>
                  <BoldText>{nickname}</BoldText>
                </div>
              </LevelItem>
            </LevelLeft>
            <LevelRight>
              <LevelItem>
                <StatusLight status={status} />
              </LevelItem>
              <LevelItem>
                <DimText>{version}</DimText>
              </LevelItem>
              <LevelItem>
                <IconButton icon={chevronDown} />
              </LevelItem>
            </LevelRight>
          </Level>
        </Box>
        {active && (
          <DetailWell>
            <HostForm id={id} />
          </DetailWell>
        )}
      </>
    );
  }
}

const SmallText = styled.div`
  font-size: 0.8em;
  color: ${COLORS.grey};
`;

const BoldText = styled.div`
  font-size: 1.2em;
  font-weight: 700;
`;

const DimText = styled.div`
  color: ${COLORS.greyLight};
`;

const DetailWell = styled(Well)`
  margin: -25px 5px 25px;
  padding: 25px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

export default Host;
