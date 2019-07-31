import {expect} from 'chai';
import 'reflect-metadata';
import {emitEvent, eventEmitter} from '../../src';

describe('@emitEvent()', function () {
    it('should throw an error if the class of a decorated function is not decorated with @eventEmitter()', () => {
        // given
        class TestClass {
            @emitEvent('myEvent')
            myFunc() {
            }
        }


        const myClass = new TestClass();

        // then
        expect(() => myClass.myFunc()).to.throw('Function myFunc() cannot be decorated with a @emitEvent() since TestClass is not decorated with @eventEmitter()');
    });
    it('should emit an event of name `myEvent` when the function completes', () => {
        // given
        @eventEmitter('someName')
        class TestClass {
            @emitEvent('myEvent')
            myFunc() {
            }
        }
        const myClass = new TestClass();
        const emitter = myClass['_eventEmitter'];
        let result = false;
        emitter.on('myEvent', () => {
            result = true;
        });

        // when
        myClass.myFunc();

        // then
        expect(result).to.equal(true);
    });
    it('should be defined', () => {
        expect(emitEvent).to.not.be.undefined;
    });
});
