import * as React from 'react';
import { connect } from 'react-redux';

import Page from '../components/Page';

import { IApplicationState } from '../reducers';
import { IHost } from '../reducers/hosts.reducer';
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
      <Page heading="Page Title" subheading="Page Subtitle">
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
      </Page>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
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
