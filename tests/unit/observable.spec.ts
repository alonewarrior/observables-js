import {expect} from 'chai';
import 'reflect-metadata';
import {EventEmitter} from 'events';
import * as td from 'testdouble';
import {Action, emitEvent, Observable} from '../../src';

describe('Observable', function () {
    let sut: TestClass;
    let em: EventEmitter;
    const eventName = 'eventName';
    const otherEventName = 'otherEventName';
    beforeEach(() => {
        sut = new TestClass();
    });
    describe('protected .notify()', () => {
        it('should emit an event with a data value to those subscribed', () => {
            // given
            const func = td.func('eventFunc') as Action<[number]>;
            sut.on(otherEventName, func);

            // when
            sut.testFunc2(3);

            // then
            td.verify(func(3));

            // cleanup
            sut.off(otherEventName, func);
        });
        it('should emit an event with no data to those subscribed', () => {
            // given
            const func = td.func('eventFunc') as Action;
            sut.on(eventName, func);

            // when
            sut.testFunc();

            // then
            td.verify(func());

            // cleanup
            sut.off(eventName, func);
        });
    });

    describe('.off()', function () {
        it('should be defined', () => {
            expect(sut.off).to.not.be.undefined;
        });
    });

    describe('.on()', function () {
        it('should be defined', () => {
            expect(sut.on).to.not.be.undefined;
        });
    });

    class TestClass extends Observable {
        testFunc() {
            this.notify(eventName);
        }
        testFunc2(data) {
            this.notify(otherEventName, data);
        }
    }
});

