// @flow
/* eslint-disable no-console */
import 'babel-polyfill';

const log = something => console.log(something);

const x :string = '123';

const y = { a: 1, b: 2 };

const { a, b } = y;

log(x);
log(y);
log(a);
log(b);
