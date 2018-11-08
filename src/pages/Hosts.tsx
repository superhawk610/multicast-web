import * as React from 'react';
import { connect } from 'react-redux';

import Page from '../components/Page';
import Host from '../components/Host';

import { IApplicationState } from '../reducers';
import { getHosts, IHost } from '../reducers/hosts.reducer';
import * as actions from '../actions';

interface IStateProps {
  loading: boolean;
  error: Error | null;
  hosts: IHost[];
}

interface IDispatchProps {
  fetchHosts: typeof actions.fetchHosts;
  fetchDevices: typeof actions.fetchDevices;
}

type Props = IStateProps & IDispatchProps;

class Hosts extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchHosts();
    this.props.fetchDevices();
  }

  public render() {
    const { loading, error, hosts } = this.props;

    return (
      <Page heading="Hosts" subheading="Multicast Host Deployments">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <div>
            {hosts.map((host, index) => (
              <Host
                key={index}
                id={host.id}
                address={host.address}
                nickname={host.nickname}
                status={host.status}
                version="3.0.0"
              />
            ))}
          </div>
        )}
      </Page>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.hosts.loading,
  error: state.hosts.error,
  hosts: getHosts(state),
});

const mapDispatchToProps = {
  fetchHosts: actions.fetchHosts,
  fetchDevices: actions.fetchDevices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hosts);
