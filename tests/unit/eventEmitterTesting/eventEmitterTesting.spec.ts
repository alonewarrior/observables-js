import { expect } from 'chai';
import * as td from 'testdouble';
import 'reflect-metadata';
import {EventEmitter} from 'events';
import {Action, emitEvent, Observable} from '../../../src';

describe('Event Emitter Testing', () => {
    const event1 = 'myEvent';
    const event2 = 'mySecondEvent';
    let observable: ObservableTestClass;
    beforeEach(() => {
        observable = new ObservableTestClass();
    });
    describe('using observable', function () {
        let someFunc: Action;
        let otherFunc: Action<[string]>;
        beforeEach(() => {
            someFunc = td.func('someFunc') as Action;
            otherFunc = td.func('otherFunc') as Action<[string]>;
        });
        afterEach(() => {
            observable.off(event1, someFunc);
            observable.off(event2, otherFunc);
        });
        it('should call otherFunc', () => {
            // given
            class TestClass {
                constructor(private readonly _observable: ObservableTestClass) {}
                something = this._observable.on(event1, someFunc);
                somethingElse = this._observable.on(event2, otherFunc);
            }
            new TestClass(observable);

            // when
            observable.func2('data2');

            // then
            td.verify(otherFunc('data2'));
        });
        it('should call someFunc', () => {
            // given
            class TestClass {
                constructor(private readonly _observable: ObservableTestClass) {}
                something = this._observable.on(event1, someFunc);
                somethingElse = this._observable.on(event2, otherFunc);
            }
            new TestClass(observable);
            // when
            observable.func1('data');

            // then
            td.verify(someFunc());
        });
    });

    class Observer {
        constructor(private readonly _observable: ObservableTestClass) {}
    }

    class ObservableTestClass extends Observable {

        @emitEvent(event1)
        func1(someData: any) {
        }

        func2(otherData: any) {
            this.notify(event2, otherData);
        }
    }
});
