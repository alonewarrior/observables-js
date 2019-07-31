import { expect } from 'chai';
import * as td from 'testdouble';
import 'reflect-metadata';
import {EventEmitter} from 'events';
import {Action} from '../../../src';


describe('Event Emitter Testing', () => {
    let emitter: EventEmitter;
    beforeEach(() => {
        emitter = new EventEmitter();
    });
    describe('using event emitter', function () {
        it('should run event handler for `myEvent` with a value', () => {
            // given
            const myEventHandler = td.func('eventHandler') as Action<any>;
            emitter.on('myEvent', myEventHandler);

            // when
            emitter.emit('myEvent', 'some value');

            // then
            td.verify(myEventHandler('some value'));
        });
        it('should run both event handlers for `myEvent`', () => {
            // given
            const myEventHandler = td.func('eventHandler') as Action<any>;
            const myEventHandler2 = td.func('eventHandler') as Action<any>;
            emitter.on('myEvent', myEventHandler);
            emitter.on('myEvent', myEventHandler2);

            // when
            emitter.emit('myEvent');

            // then
            td.verify(myEventHandler());
            td.verify(myEventHandler2());
        });
        it('should run event handler for `myEvent`', () => {
            // given
            const myEventHandler = td.func('eventHandler') as Action<any>;
            emitter.on('myEvent', myEventHandler);

            // when
            emitter.emit('myEvent');

            td.verify(myEventHandler());
        });
    });
});
