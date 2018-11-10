import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import Page from '../components/Page';

import ChannelForm from '../forms/ChannelForm';

import { IApplicationState } from '../reducers';
import { getChannelById, IChannel } from '../reducers/channels.reducer';

import routes from '../routes';

interface IStateProps {
  channel: IChannel;
}

type Props = RouteComponentProps<any> & IStateProps;

const ManageChannel = ({ channel }: Props) =>
  !channel ? (
    <Redirect to="/404" />
  ) : (
    <Page
      heading="Manage Channel"
      subheading={channel.name}
      parent={routes.Channels}
    >
      <ChannelForm />
    </Page>
  );

const mapStateToProps = (
  state: IApplicationState,
  {
    match: {
      params: { id },
    },
  }: Props,
) => ({
  channel: getChannelById(state, id),
});

export default connect(mapStateToProps)(ManageChannel);
