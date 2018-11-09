import * as React from 'react';
import { connect } from 'react-redux';

import Page from '../components/Page';
import { Heading2 } from '../components/Heading';
import Table from '../components/Table';
import StatusLight from '../components/StatusLight';

import RegisterHostForm from '../forms/RegisterHostForm';

import { IHost, getHosts } from '../reducers/hosts.reducer';
import { IApplicationState } from '../reducers';
import * as actions from '../actions';

interface IStateProps {
  loading: boolean;
  error: Error | null;
  hosts: IHost[];
}

interface IDispatchProps {
  fetchHosts: () => void;
}

type Props = IStateProps & IDispatchProps;

class Configuration extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchHosts();
  }

  public render() {
    const { loading, error, hosts } = this.props;

    return (
      <Page heading="Configuration" subheading="Existing Deployments">
        <Table
          data={hosts}
          loading={loading}
          error={error}
          headers={['id', 'address', 'nickname', 'status']}
          headerLabels={['#', 'Address', 'Nickname', 'Host Status']}
          renderRow={{
            status: (host: IHost) => <StatusLight status={host.status} />,
          }}
          noRecordsFoundText="No Existing Deployments."
        />
        <Heading2>Register New Deployment</Heading2>
        <RegisterHostForm />
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
)(Configuration);
