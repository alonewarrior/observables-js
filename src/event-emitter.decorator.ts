import { EventEmitter } from 'events';
import 'reflect-metadata';
import {EventMetaKeys} from './constants';
import {getEventEmitters} from './events.helper';

export function eventEmitter(emitterName: string) {
    return (target: any): any => {
        const eventEmitterData = getEventEmitters();
        eventEmitterData[emitterName] = target;
        target.prototype._eventEmitter = new EventEmitter();
        Reflect.defineMetadata(EventMetaKeys.EventEmitter, eventEmitterData, Reflect);
        return target;
    }
}

