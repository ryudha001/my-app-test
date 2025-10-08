import EventEmitter from 'eventemitter3';

const eventEmitter = new EventEmitter();

export const emitter = {
  on: (event, fn, context) => eventEmitter.on(event, fn, context),
  once: (event, fn, context) => eventEmitter.once(event, fn, context),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
};
Object.freeze(emitter);
