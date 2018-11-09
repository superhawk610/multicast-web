import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Page from '../components/Page';
import { Heading2 } from '../components/Heading';
import Table from '../components/Table';

import RegisterChannelForm from '../forms/RegisterChannelForm';
import { IApplicationState } from '../reducers';

interface IStateProps {
  loading: boolean;
  error: Error | null;
  channels: IChannel[];
}

interface IDispatchProps {
  fetchChannels: () => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

class Channels extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchChannels();
  }

  public render() {
    const { loading, error, channels, history } = this.props;
    const actionForRow = (row: IChannel) => ({
      text: 'Manage',
      onClick: (channel: IChannel) => history.push(`/channels/${channel.id}`),
    });

    return (
      <Page heading="Channels" subheading="Active Channels">
        <Table
          data={channels}
          loading={loading}
          error={error}
          headers={['id', 'name']}
          headerLabels={['#', 'Name']}
          actionForRow={actionForRow}
        />
        <Heading2>Register New Channel</Heading2>
        <RegisterChannelForm />
      </Page>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.channels.loading,
  error: state.channels.error,
  channels: getChannels(state),
});

const mapDispatchToProps = {
  fetchChannels: actions.fetchChannels,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Channels),
);
