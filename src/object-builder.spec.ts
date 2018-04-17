import {expect} from 'chai';
import {describe, it} from 'mocha';
import {ObjectBuilder} from './object-builder';

class Sample {
    numericField: number;
    stringField: string;
}

class SampleObjectBuilder extends ObjectBuilder<Sample> {
    constructor() {
        super(Sample);
    }
}

describe('ObjectBuilder', () => {
    it('should build with given values', () => {
        const builder = new SampleObjectBuilder();
        const obj = builder.with('numericField', 123).with('stringField', 'sample string').build();

        expect(obj.numericField).to.equal(123);
        expect(obj.stringField).to.equal('sample string');
    });

    it('should build a list with given values', () => {
        const builder = new SampleObjectBuilder();
        const sampleValues = [123, 234];
        const objList = builder
            .with('numericField', () => sampleValues.pop())
            .with('stringField', 'sample string').buildList(2);

        expect(objList).to.be.an('array').that.has.length(2);
        expect(objList[0].numericField).to.equal(234);
        expect(objList[0].stringField).to.equal('sample string');
        expect(objList[1].numericField).to.equal(123);
        expect(objList[1].stringField).to.equal('sample string');
    });

    it('should exclude fields', () => {
        const builder = new SampleObjectBuilder();
        const obj = builder.with('numericField', 123)
            .with('stringField', 'sample string')
            .without('stringField')
            .build();

        expect(obj.numericField).to.equal(123);
        expect(obj.stringField).to.be.an('undefined');
    });
});
