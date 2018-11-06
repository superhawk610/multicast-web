import * as React from 'react';
import { connect } from 'react-redux';

import { ApplicationState } from '../reducers';
import { Host } from '../reducers/hosts.reducer';
import * as actions from '../actions';

export interface Props {
  loading: boolean;
  error: Error | null;
  hosts: Array<Host>;
  fetchHosts: typeof actions.fetchHosts;
}

class Hosts extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchHosts();
  }

  render() {
    const { loading, error, hosts } = this.props;

    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <div>
            {hosts.map((host, index) => (
              <div key={index}>{host.address}</div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  loading: state.hosts.loading,
  error: state.hosts.error,
  hosts: state.hosts.data,
});

const mapDispatchToProps = {
  fetchHosts: actions.fetchHosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Hosts);
