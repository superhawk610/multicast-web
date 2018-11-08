import * as React from 'react';
import { connect } from 'react-redux';

import Page from '../components/Page';
import Host from '../components/Host';

import { IApplicationState } from '../reducers';
import { getHosts, IHost } from '../reducers/hosts.reducer';
import * as actions from '../actions';

export interface IProps {
  loading: boolean;
  error: Error | null;
  hosts: IHost[];
  fetchHosts: typeof actions.fetchHosts;
}

class Hosts extends React.Component<IProps> {
  public componentDidMount() {
    this.props.fetchHosts();
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
                status="online"
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hosts);
