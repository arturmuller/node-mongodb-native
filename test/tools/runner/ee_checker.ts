// eslint-disable-next-line @typescript-eslint/no-require-imports
const events = require('events');

const EventEmitter = events.EventEmitter;

events.EventEmitter = class RequireErrorListenerEventEmitter extends EventEmitter {
  constructor(...args) {
    super(...args);
    const ctorCallSite = new Error('EventEmitter must add an error listener synchronously');
    ctorCallSite.stack;
    process.nextTick(() => {
      if (this.listenerCount('error') === 0) {
        throw ctorCallSite;
      }
    });
  }
};
