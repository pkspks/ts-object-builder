# object-builder

Build status: [![CircleCI](https://circleci.com/gh/pkspks/ts-object-builder.svg?style=svg)](https://circleci.com/gh/pkspks/ts-object-builder)

Simple Typesafe Object builder for Typescript


## Installation

`npm install ts-object-builder`


## Usage

### Build with fixed values
```typescript
class Sample {
    numericField: number;
    stringField: string;
}

class SampleObjectBuilder extends ObjectBuilder<Sample> {
    constructor() {
        super(Sample);
    }
}

const obj = new SampleObjectBuilder()
                .with('numericField', 123)
                .with('stringField', 'awesome string')
                .build();
```

### Build with functions to provide value
```typescript
const obj = new SampleObjectBuilder()
                .with('numericField', 123)
                .with('stringField', () => 'awesome string')
                .build();
```

### Build multiple
```typescript
const objList = new SampleObjectBuilder()
                .with('numericField', () => Math.random() * 1000000)
                .with('stringField', 'awesome string')
                .buildList(2);
```

### Build without certain fields
```typescript
const objList = new SampleObjectBuilder()
                .with('numericField', () => Math.random() * 1000000)
                .with('stringField', 'awesome string')
                .without('stringField')
                .buildList(2);
```
