# unit-converter #
Javascript unit conversion library

This is currently in beta. You are welcome to try out the functionality and give me feedback. Tests and coverage are at 100%. See roadmap at end for future plans for this library.

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

### Accounting for javascript math limitations ###

#### Conversion ratio errors ####

By default, units are created in strict mode, which ensures that conversions between different units are always accurate. If the conversion can not be done accurately, an error is thrown

```
const { Volume } = require('unit-converter');
const size = new Volume(99, 'cbkm');

console.log(size.cbmm); // thorws "E002: Conversion ratio greater than max safe integer"
```

Strict mode can be turned off by passing 'false' as the third argument to the constructor. Similarly 'true' can be passed to explicitluy set it.
```
const size2 = new Volume(99, 'cbkm', false);

console.log(size.cbmm); // prints 99000000000000000000
```
Note that the error is thrown is unit-converter cannot guarantee an accurate conversion, even if the value output is accurate.

#### Assignment precision errors ####

A harder to detect issue is due to how javascript handles division, and is a flaw in floating point arithmetic in general. This example illustrates it
```
const distance = new Length(0, 'km');
distance.mm = 3;

console.log(distance.mm); // prints 3
console.log(distance.cm); // prints 0.3
console.log(distance.dm); // caution! prints 0.030000000000000002
console.log(distance.m); // prints 0.003
console.log(distance.dam); // caution! prints 0.00030000000000000003
console.log(distance.hm); // prints 0.00003
console.log(distance.km); // prints 0.000003
```

To overcome this, when creating the measurment set the unit to the smallest base unit you need. Then the conversions will mostly involve multiplication.

```
const distance = new Length(0, 'mm');
distance.mm = 3;

console.log(distance.mm); // prints 3
console.log(distance.cm); // prints 0.3
console.log(distance.dm); // prints 0.03
console.log(distance.m); // prints 0.003
console.log(distance.dam); // prints 0.0003
console.log(distance.hm); // prints 0.00003
console.log(distance.km); // prints 0.000003
```

Unfortunately there is no automatic way to detect this issue so strict mode will not flag it.


### Unit object attributes and methods ###

## Advanced Usage ##

### Extending an existing unit class ###

TBA

### Creating a new unit class ###

TBA

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
- hecta- ```.hm``` 10^2
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

### Volume ###
- All length units prefixed with ```cb``` for cube
-- E.g. ```cbm``` cubic metres
-- ```cc``` also available for cubic centimetres, same as ```cbcm```
- litres ```.l``` also with SI prefixes
- imperial units fluid ounces, pints, gallons ```.impfloz```, ```.imppt```, ```.impgal```
- US units fluid ounces, pints, gallons ```.USfloz```, ```.USpt```, ```.USgal```
- US dry gallons ```.USdrygal```

### Mass ###
- grammes ```.g``` also with SI prefixes. Note that kilogrammes ```.kg``` is the base unit
-- metric tonnes ```.mett``` also available, same as megagrammes ```.Mg```
- Imperial units
-- US long tonnes and hundredweights ```.lont```, ```.loncwt```
-- US and imperial short tonnes and hundredweights ```.shot```, ```.shocwt```
-- Stones, pounds, ounces and slugs ```.st```, ```.lbm```, ```.oz```, ```.slug```. Note pounds are lbm for pounds mass
-- Troy pounds and ounces ```.troylb```, ```.troyoz```

### Temperature ###
- kelvins ```.K``` also with SI prefixes.
- degrees Celsius ```.degC```.
- degrees Fahrenheit ```.degF```.
- degrees Rankine ```.degRa```.

## Roadmap

- [ ] Add JSDoc to public APIs
- [ ] Document errors and exceptions that can be thrown
- [ ] Add extension instructions to this readme
- [ ] $toUTF8 and $toHTML methods for correct characters for microns, angstroms, etc.
- [ ] Parse method in base classes to convert strings to measuremenrts
- [ ] Missing length units for astronomy - parsecs, light-years
- [ ] Various missing imperial mass units if there is demand
- [ ] Scalar $mult method to base Unit
- [ ] Extended $mult method to Length and Area to allow Areas and Volumes to be created
- [ ] Time and Frequency
- [ ] Pressure
- [ ] Speed
- [ ] Force
- [ ] Energy
- [ ] Power
- [ ] CGS support
