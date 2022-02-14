# unit-converter #
Javascript unit conversion library

## Goals ##
This library is intended to provide an easy to use set of objects to convert between various units (length, area, temperature, etc.) While converting between two units can be as easy as multiplying by a conversion factor, there are several problems this library overcomes:
- Javascript's inherent calculation problems caused by all numbers being floating point.
- Web sites and applications which need to offer ways to have people enter measurements in the units of their choice.
- People using node as a calculator and not needing to look up and potentially mistype conversion factors.

## Basic usage ##

### Converting between units ###

This package supplies a class for each suppported length. Import the class and the various units are accessible as getters and setters, e.g.

```
const { Length } = require('unit-converter');
const height = new Length(171, 'cm');

console.log(`I am ${height}`); // prints 'I am 171cm' 
console.log(height.m); // prints '1.71'
console.log(height.ft); // prints '5.610236220472441'

height.ft = 5.6; // change the measurement in feet, but keep the base unit cm

console.log(`I am ${height}`); // prints 'I am 170.688cm'
console.log(height.m); // prints '1.70688'
console.log(height.ft); // prints '5.6'
```

## Supported units ##

### SI prefixes for metric measurements ###

Metres used as example unit.
- yotto- ```.ym``` 10^-24
- zetto- ```.zm``` 10^-21
- atto- ```.am``` 10^-18
- femto- ```.fm``` 10^-15
- pico- ```.pm``` 10^-12
- nano- ```.nm``` 10^-9
- micro- ```.um``` 10^-6 - note, lowercase u not µ
- milli- ```.mm``` 10^-3
- centi- ```.cm``` 10^-2
- deci- ```.dm``` 10^-1
- deca- ```.dam``` 10
- hecta- ```.km``` 10^2
- kilo- ```.km``` 10^3
- mega- ```.Mm``` 10^6
- giga- ```.Gm``` 10^9
- tera- ```.Tm``` 10^12
- peta- ```.Pm``` 10^15
- exa- ```.Em``` 10^18
- zepta- ```.Zm``` 10^21
- yocta- ```.Ym``` 10^24 

### Length ###

- metres ```.m``` also with SI prefixes.
- inches, feet, yards and miles ```.in .ft .yd .mi```.
- nautical miles ```.nmi```. This is not nanomiles!

### Area ###
- All length units prefixed with ```sq``` for square
-- E.g. ```.sqm``` square metres, ```.sqkm``` square kilometres, ```.sqft``` square feet
- ares ```.a``` also with SI prefixes
- barns ```.barn```
- acres ```.acre```

### Temperature ###
- kelvins ```.K``` also with SI prefixes.
- degrees Celsius ```.degC```.
- degrees Fahrenheit ```.degF```.
- degrees Rankine ```.degRa```.
