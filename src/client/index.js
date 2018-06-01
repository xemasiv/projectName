// @flow
import 'babel-polyfill';

const log = something => something;

const x :string = '123';

log(x);
const O = {};
log(Reflect.defineMetadata('foo', 'bar', O));
log(Reflect.ownKeys(O)); // => []
log(Reflect.getOwnMetadataKeys(O)); // => ['foo']
log(Reflect.getOwnMetadata('foo', O)); // => 'bar'
