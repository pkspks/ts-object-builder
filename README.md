# object-builder

Build status: [![CircleCI](https://circleci.com/gh/pkspks/ts-object-builder.svg?style=svg)](https://circleci.com/gh/pkspks/ts-object-builder)
[![Maintainability](https://api.codeclimate.com/v1/badges/b322b07affdd35f2d2d0/maintainability)](https://codeclimate.com/github/pkspks/ts-object-builder/maintainability)

Simple Typesafe Object builder for Typescript


## Installation

`npm install --save-dev ts-object-builder`


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
// Builds:
// {
//      numericField: 123, 
//      stringField: 'awesome string'
// }
```

### Build with functions to provide value
```typescript
const obj = new SampleObjectBuilder()
                .with('numericField', 123)
                .with('stringField', () => 'awesome string')
                .build();

// Builds:
// {
//      numericField: 123, 
//      stringField: 'awesome string'
// }
```

### Build multiple
```typescript
const objList = new SampleObjectBuilder()
                .with('numericField', () => Math.random() * 1000000)
                .with('stringField', 'awesome string')
                .buildList(2);

// Builds:
// [
//  {
//      numericField: 123, 
//      stringField: 'awesome string'
//  },
//  {
//      numericField: 234, 
//      stringField: 'awesome string'
//  }
// ]
```


### Build multiple with index
```typescript
const objList = new SampleObjectBuilder()
                .with('numericField', () => Math.random() * 1000000)
                .with('stringField',  (index: number) => `value ${index}`)
                .buildList(2);

// Builds:
// [
//  {
//      numericField: 123, 
//      stringField: 'value 0'
//  },
//  {
//      numericField: 234, 
//      stringField: 'value 1'
//  }
// ]
```

### Build without certain fields
```typescript
const objList = new SampleObjectBuilder()
                .with('numericField', () => Math.random() * 1000000)
                .with('stringField', 'awesome string')
                .without('stringField')
                .buildList(2);

// Builds:
// [
//  {
//      numericField: 123
//  },
//  {
//      numericField: 234
//  }
// ]
```
