import {expect} from 'chai';
import 'reflect-metadata';
import * as td from 'testdouble';
import {Action, emitEvent, Observable} from '../../src';

class OtherClass {}

describe('@emitEvent()', function () {
    it('should throw an error if the class of a decorated function does not extend Observable', () => {
        expect(() => {
            class TestClass {
                @emitEvent('myEvent')
                myFunc() {
                }
            }
        }).to.throw('Cannot emit events from a class not extending Observable');
    });
    it('should emit an event, myEvent, with the function result when the function completes', () => {
        // given
        class TestClass extends Observable {
            @emitEvent('myEvent')
            myFunc() {
                return 'hello'
            }
        }
        const func = td.func('myFunc') as Action<[string]>;
        const myClass = new TestClass();
        myClass.on('myEvent', func);

        // when
        myClass.myFunc();

        // then
        td.verify(func('hello'));
    });
    it('should emit an event, myEvent, with undefined data when the function completes', () => {
        // given
        class TestClass extends Observable {
            @emitEvent('myEvent')
            myFunc() {
            }
        }
        const func = td.func('myFunc') as Action;
        const myClass = new TestClass();
        myClass.on('myEvent', func);

        // when
        myClass.myFunc();

        // then
        td.verify(func());
    });
    it('should be defined', () => {
        expect(emitEvent).to.not.be.undefined;
    });
});

