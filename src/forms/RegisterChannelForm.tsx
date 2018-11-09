import * as React from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import ButtonGroup from '../components/ButtonGroup';
import ChannelLayoutPicker from '../components/ChannelLayoutPicker';

import {
  IChannel,
  ChannelRotation,
  ChannelLayout,
} from '../reducers/channels.reducer';

import { THEMES } from '../constants';

import { IApplicationState } from '../reducers';
import * as actions from '../actions';

import { Omit } from '../types';

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
  rotation: ChannelRotation;
  urls: string[];
}

type Props = IStateProps & IDispatchProps;

class RegisterChannelForm extends React.Component<Props, IState> {
  public state: IState = {
    name: '',
    layout: 'single',
    duration: 0,
    rotation: 0,
    urls: [''],
  };

  private rotationButtons = [{ text: 'None', value: 0, theme: THEMES.dark }];

  private durationButtons = [
    { text: 'Indefinite', value: 0, theme: THEMES.dark },
  ];

  public onNameChange = (name: string) => this.setState({ name });

  public onRotationChange = (rotation: ChannelRotation) =>
    this.setState({ rotation });

  public onDurationChange = (duration: number) => this.setState({ duration });

  public onLayoutChange = (layout: ChannelLayout) => this.setState({ layout });

  public onSubmit = () => {
    const { createChannel } = this.props;
    const { name, layout, duration, rotation, urls } = this.state;
  };

  public render() {
    const { loading, error } = this.props;
    const { name, layout, duration, rotation, urls } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Input
          name="name"
          label="Name"
          value={name}
          onChange={this.onNameChange}
        />
        <ChannelLayoutPicker layout={layout} onChange={this.onLayoutChange}>
          <div>
            <ButtonGroup
              buttons={this.rotationButtons}
              value={rotation}
              onChange={this.onRotationChange}
            />
          </div>
          <div>
            <ButtonGroup
              buttons={this.durationButtons}
              value={duration}
              onChange={this.onDurationChange}
            />
          </div>
        </ChannelLayoutPicker>
        <Button submit theme={THEMES.success} text="Save" />
      </Form>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => ({
  loading: state.channels.loading,
  error: state.channels.error,
});

const mapDispatchToProps = {
  createChannel: actions.createChannel,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterChannelForm);
