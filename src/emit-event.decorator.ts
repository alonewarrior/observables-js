import 'reflect-metadata';
import {Observable} from './observable';

export function emitEvent(eventName: string) {
    return (target, key, descriptor) => {
        const oldFunc = target[key];
        if (Object.getPrototypeOf(target.constructor) !== Observable) {
            throw new Error('Cannot emit events from a class not extending Observable');
        }
        descriptor.value = function (...args) {
            const result = oldFunc(...args);
            this['notify'](eventName, result);
        };
        return descriptor;
    };
}
