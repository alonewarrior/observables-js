import {expect} from 'chai';
import 'reflect-metadata';
import {getListeners, listener} from '../src';

describe('@listener()', () => {
    it('should register the listener for an event with the provided name', () => {
        // given
        class TestClass {
            @listener('myListener')
            myListener(input: any): void {}
        }

        // when
        const result = getListeners();

        // then
        expect(result['myListener']).to.not.be.undefined;
    });
    it('should be defined', () => {
        expect(listener).to.not.be.undefined;
    });
});
