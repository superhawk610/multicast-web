import * as React from 'react';
import { connect } from 'react-redux';
import produce from 'immer';

import Form from '../components/Form';
import { Row, Column } from '../components/Grid';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonGroup, { IButton } from '../components/ButtonGroup';
import ChannelLayoutPicker from '../components/ChannelLayoutPicker';

import { IChannel, ChannelLayout } from '../reducers/channels.reducer';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import * as actions from '../actions';

import { Omit } from '../types';
import ErrorDisplay from '../components/ErrorDisplay';

interface IStateProps {
  loading: boolean;
  error: Error | null;
}

interface IDispatchProps {
  createChannel: (channel: Omit<IChannel, 'id'>) => void;
}

interface IState {
  name: string;
  layout: ChannelLayout;
  duration: number;
  urls: string[];
  urlSlotCount: number;
}

type Props = IStateProps & IDispatchProps;

class RegisterChannelForm extends React.Component<Props, IState> {
  public state: IState = {
    name: '',
    layout: 'single',
    duration: 0,
    urls: ['', '', ''],
    urlSlotCount: 1,
  };

  private durationButtons: IButton[] = [
    { text: 'Indefinite', value: 0 },
    { text: '1m', value: 60 * 1000 },
    { text: '5m', value: 5 * 60 * 1000 },
    { text: '10m', value: 10 * 60 * 1000 },
    { text: '15m', value: 15 * 60 * 1000 },
    { text: '30m', value: 30 * 60 * 1000 },
    { text: '1h', value: 60 * 60 * 1000 },
  ];

  public onNameChange = (name: string) => this.setState({ name });

  public onDurationChange = (duration: number) => this.setState({ duration });

  public onLayoutChange = (layout: ChannelLayout, urlSlotCount: number) =>
    this.setState({ layout, urlSlotCount });

  public onUrlChange = (index: number) => (url: string) =>
    this.setState(state =>
      produce(state, draftState => {
        draftState.urls[index] = url;
      }),
    );

  public onSubmit = () => {
    const { createChannel } = this.props;
    const { name, layout, duration, urls } = this.state;

    createChannel({ name, layout, duration, urls });
  };

  public render() {
    const { loading, error } = this.props;
    const { name, layout, duration, urls, urlSlotCount } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Row>
          <Column width={4}>
            <Input
              name="name"
              label="Name"
              placeholder="Channel Name"
              value={name}
              onChange={this.onNameChange}
            />
          </Column>
          <Column width={8}>
            <label className="label">Duration</label>
            <ButtonGroup
              buttons={this.durationButtons}
              value={duration}
              onChange={this.onDurationChange}
            />
          </Column>
        </Row>
        <ChannelLayoutPicker layout={layout} onChange={this.onLayoutChange}>
          <label className="label">URL(s)</label>
          {urls.map((url, index) => (
            <Input
              key={index}
              disabled={index >= urlSlotCount}
              name={`url-${index}`}
              placeholder={`URL ${index + 1}`}
              value={url}
              onChange={this.onUrlChange(index)}
            />
          ))}
        </ChannelLayoutPicker>
        {error && <ErrorDisplay error={error} />}
        <Button submit loading={loading} theme={THEMES.success} text="Save" />
      </Form>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.channels.modifyLoading,
  error: state.channels.modifyError,
});

const mapDispatchToProps = {
  createChannel: actions.createChannel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterChannelForm);
