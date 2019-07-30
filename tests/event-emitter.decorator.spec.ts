import {eventEmitter} from '../src';
import { expect } from 'chai';
import 'reflect-metadata';
import {EventMetaKeys} from '../src/constants';

describe('@eventEmitter()', () => {
    it('should have a property:key pair on the metadata `src:event-emitter` equal to `someName`:TestClass', () => {
        // given
        @eventEmitter('someName')
        class TestClass {
        }

        // when
        const metadata = Reflect.getMetadata(EventMetaKeys.EventEmitter, Reflect);

        // then
        expect(metadata['someName']).to.equal(TestClass);
    });
    it('should have a metadata value for `src:event-emitter` on Reflect', () => {
        // given
        @eventEmitter('someName')
        class TestClass {
        }

        // then
        expect(Reflect.getMetadata(EventMetaKeys.EventEmitter, Reflect)).to.not.be.undefined;
    });
    it('should ', () => {

    });
    it('should have an _eventEmitter property on the target prototype', () => {
        // given
        @eventEmitter('')
        class TestClass {
        }

        // then
        expect(TestClass.prototype.hasOwnProperty('_eventEmitter')).to.equal(true);
    });
    it('should be defined', () => {
        expect(eventEmitter).to.not.be.undefined;
    });
});

