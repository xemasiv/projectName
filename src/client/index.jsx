// @flow
/* eslint-disable no-console */

import * as React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

type Props = { };
type State = {
  count: number,
};

class MyComponent extends React.Component<Props, State> {
  state = {
    count: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => ({
        count: prevState.count + 1,
      }));
    }, 1000);
  }

  render() {
    return (
      <div>Count: {this.state.count}</div>
    );
  }
}

const rootEl = document.querySelector('#root');
if (!(rootEl instanceof Element)) {
  throw new Error('invalid type');
}
ReactDOM.render(<MyComponent bar="yeah" />, rootEl);
