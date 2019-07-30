import {expect} from 'chai';
import 'reflect-metadata';
import {addListener, getEventEmitters, getListeners, getListenersByName} from '../src';
import {EventMetaKeys} from '../src/constants';

describe('Events Helper', function () {
    beforeEach(() => {
        Reflect.deleteMetadata(EventMetaKeys.EventListener, Reflect);
        Reflect.deleteMetadata(EventMetaKeys.EventEmitter, Reflect);
    });
    describe('getEventEmitters()', () => {
        it('should return an object containing a property `someClass` equal to a class definition', () => {
            // given
            class MyClass {}
            Reflect.defineMetadata(EventMetaKeys.EventEmitter, {someClass: MyClass}, Reflect);

            // when
            const result = getEventEmitters();

            // then
            expect(result).to.deep.equal({someClass: MyClass});
        });
        it('should return an object', () => {
            // given
            // when
            const result = getEventEmitters();

            // then
            expect(result).to.deep.equal({});
        });
        it('should be defined', () => {
            expect(getEventEmitters).to.not.be.undefined;
        });
    });
    describe('addListener()', function () {
        [
            {description: 'add myListener', inputs: [['myListener', () => undefined]], expected: [['myListener', 1]]},
            {
                description: 'add myListener and myListener2',
                inputs: [['myListener', () => undefined], ['myListener', () => undefined]],
                expected: [['myListener', 2]]
            }
        ].forEach((t: { description: string, inputs: [string, () => void][], expected: [string, number][] }) => {
            it('should add listener functions', () => {
                // given
                // when
                t.inputs.forEach(x => addListener(x[0], x[1]));

                // then
                const result = getListeners();
                t.expected.forEach(([key, length]) => expect(result[key].length).to.equal(length));
            });
        });
        [
            {description: 'add myListener', inputs: ['myListener'], expected: ['myListener']},
            {
                description: 'add myListener and myListener2',
                inputs: ['myListener', 'myListener2'],
                expected: ['myListener', 'myListener2']
            },
            {
                description: 'add myListener, myListener2, and myOtherListener',
                inputs: ['myListener', 'myListener2', 'myOtherListener'],
                expected: ['myListener', 'myListener2', 'myOtherListener']
            }
        ].forEach((t: { description: string, inputs: string[], expected: string[] }) => {
            it('should add listener names', () => {
                // given
                // when
                t.inputs.forEach(x => addListener(x, () => undefined));

                // then
                const result = getListeners();
                Object.keys(result).forEach(x => expect(t.expected.includes(x)).to.equal(true));
                t.expected.forEach(x => expect(result.hasOwnProperty(x)).to.equal(true));
            });
        });
        it('should be defined', () => {
            expect(addListener).to.not.be.undefined;
        });
    });
    describe('getListenersByName()', function () {
        it('should return an array with two values for `myListener`', () => {
            // given
            Reflect.defineMetadata(EventMetaKeys.EventListener, {myListener: [() => undefined, () => undefined]}, Reflect);

            // when
            const result = getListenersByName('myListener');

            // then
            expect(result.length).to.equal(2);
        });
        it('should return undefined if no listeners are defined for `myOtherListener`', () => {
            // given

            // when
            const result = getListenersByName('myOtherListener');

            // then
            expect(result).to.equal(undefined);
        });
        it('should return an array with a single value for `myListener`', () => {
            // given
            Reflect.defineMetadata(EventMetaKeys.EventListener, {myListener: [() => undefined]}, Reflect);

            // when
            const result = getListenersByName('myListener');

            // then
            expect(result.length).to.equal(1);
        });
        it('should be defined', () => {
            expect(getListenersByName).to.not.be.undefined;
        });
    });
    describe('getListeners()', () => {
        it('should return an object containing property `listener` with a value equal to []', () => {
            // given
            Reflect.defineMetadata(EventMetaKeys.EventListener, {listener: []}, Reflect);
            // when
            const result = getListeners();

            // then
            expect(result).to.deep.equal({listener: []});
        });
        it('should return an object', () => {
            // given
            // when
            const result = getListeners();

            // then
            expect(result).to.deep.equal({});
        });
        it('should be defined', () => {
            expect(getListeners).to.not.be.undefined;
        });
    });
});
