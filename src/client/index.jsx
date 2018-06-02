// @flow
/* eslint-disable no-console */

import * as React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';

import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';

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
      <div>
        Count: {this.state.count}
        <br />
        <AlarmIcon />
        <Button variant="raised" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

const rootEl = document.querySelector('#root');
if (!(rootEl instanceof Element)) {
  throw new Error('invalid type');
}
ReactDOM.render(<MyComponent bar="yeah" />, rootEl);
