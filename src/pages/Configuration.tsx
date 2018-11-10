import * as React from 'react';
import { connect } from 'react-redux';

import Page from '../components/Page';
import { Heading2 } from '../components/Heading';
import Table from '../components/Table';
import StatusLight from '../components/StatusLight';

import RegisterHostForm from '../forms/RegisterHostForm';

import { THEMES } from '../constants';

import { IHost, getHosts } from '../reducers/hosts.reducer';
import { DialogResultAction } from '../reducers/dialog.reducer';
import { IApplicationState } from '../reducers';
import * as actions from '../actions';

interface IStateProps {
  loading: boolean;
  error: Error | null;
  hosts: IHost[];
}

interface IDispatchProps {
  fetchHosts: () => void;
  showDialog: (
    heading: string,
    message: string,
    onConfirmAction: DialogResultAction,
  ) => void;
}

type Props = IStateProps & IDispatchProps;

class Configuration extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchHosts();
  }

  public onRemoveClick = (host: IHost) => {
    this.props.showDialog(
      'Are you sure?',
      'This action CANNOT be undone.',
      actions.deleteHost(host.id),
    );
  };

  public render() {
    const { loading, error, hosts } = this.props;

    const actionForRow = (host: IHost) => ({
      text: 'Remove',
      onClick: this.onRemoveClick,
    });

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
          actionForRow={actionForRow}
          actionTheme={THEMES.danger}
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
  showDialog: actions.showDialog,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);
