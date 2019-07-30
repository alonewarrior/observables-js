import 'reflect-metadata';

export function emitEvent(eventName: string) {
    return (target, key, descriptor) => {
        const oldFunc = target[key];
        descriptor.value = function (...args) {
            if (!target['_eventEmitter']) {
                throw new Error(`Function ${key}() cannot be decorated with a @emitEvent() since ${target.constructor.name} is not decorated with @eventEmitter()`);
            }
            oldFunc(...args);
            target['_eventEmitter'].emit(eventName);
        };
        return descriptor;
    };
}
