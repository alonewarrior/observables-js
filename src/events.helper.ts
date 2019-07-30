import {EventMetaKeys} from './constants';

export function getEventEmitters() {
    return Reflect.getMetadata(EventMetaKeys.EventEmitter, Reflect) || {};
}

export function getListeners() {
    return Reflect.getMetadata(EventMetaKeys.EventListener, Reflect) || {};
}

export function addListener(listenerName: string, func: () => void): void {
    const listeners = getListeners();
    const tempListeners = listeners[listenerName] || [];
    tempListeners.push(func);
    listeners[listenerName] = tempListeners;
    Reflect.defineMetadata(EventMetaKeys.EventListener, listeners, Reflect);
}

export function getListenersByName(listenerName: string): Function[] {
    const listeners = getListeners();
    return listeners[listenerName];
}
