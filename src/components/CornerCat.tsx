import * as React from 'react';
import styled from 'styled-components';

import cat from '../images/cat.png';

interface IProps {
  in: boolean;
}

interface IState {
  mounted: boolean;
}

class CornerCat extends React.Component<IProps, IState> {
  public state: IState = {
    mounted: false,
  };

  private el: HTMLImageElement;

  public componentDidMount() {
    this.el && this.el.scrollTop; // tslint:disable-line:no-unused-expression
    this.setState({ mounted: true });
  }

  public render() {
    const { in: inProp } = this.props;
    const { mounted } = this.state;

    const animated = !mounted ? false : inProp ? true : false;
    const style = {
      opacity: animated ? 1 : 0,
      transform: `rotate(${animated ? 0 : 3}deg) translate(${
        animated ? '0, 0' : '10px, 10px'
      }`,
    };

    return <Image ref={this.elRef as any} style={style} src={cat} />;
  }

  private elRef = (ref: HTMLImageElement) => (this.el = ref);
}

const Image = styled.img`
  position: fixed;
  bottom: -40px;
  right: -25px;
  width: 200px;
  transition: transform 800ms cubic-bezier(0.61, 0.42, 0.25, 1.47),
    opacity 300ms ease-out;
  pointer-events: none;
`;

export default CornerCat;
