import {EventEmitter} from 'events';
import {Action, IObservable} from './common';

export abstract class Observable implements IObservable {
    protected readonly _eventEmitter = new EventEmitter();
    protected notify(eventName: string, data?: any): void {
        if (data !== undefined) {
            this._eventEmitter.emit(eventName, data);
        }
        this._eventEmitter.emit(eventName);
    }

    on<T extends [any?]>(eventName: string, func: Action<T>): void {
        this._eventEmitter.on(eventName, func);
    }

    off<T extends [any?]>(eventName: string, func: Action<T>): void {
        this._eventEmitter.off(eventName, func);
    }
}
