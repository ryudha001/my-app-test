import { useEffect } from 'react';
import { emitter } from '../lib';
import EVENT_LIST from '../config/event.json';

export const EVENT = EVENT_LIST;

export const useEvent = (event: string, fn: Function) => {
  useEffect(() => {
    emitter.on(event, fn);
    return () => {
      emitter.off(event, fn);
    };
  }, [event, fn]);
};

export const useEventOnce = (event: string, fn: Function) => {
  useEffect(() => {
    emitter.once(event, fn);
    return () => {
      emitter.off(event, fn);
    };
  }, [event, fn]);
};

export const dispatchEvent = (event: string, payload?: any) => {
  emitter.emit(event, payload || {});
};
