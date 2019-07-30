import 'reflect-metadata';
import {addListener} from './events.helper';

export function listener(eventName: string) {
    return (target, key, descriptor) => {
        addListener(eventName, descriptor.value.bind(target));
        return descriptor;
    };
}

