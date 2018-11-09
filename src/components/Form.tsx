import * as React from 'react';

interface IProps {
  onSubmit: () => void;
}

class Form extends React.Component<IProps> {
  public onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSubmit();
  };

  public render() {
    const { onSubmit, ...delegated } = this.props;

    return <form onSubmit={this.onSubmit} {...delegated} />;
  }
}

export default Form;
