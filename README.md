# mesh-jack
[![Build Status](https://travis-ci.org/bakesaled/mesh-jack.svg?branch=master)](https://travis-ci.org/bakesaled/mesh-jack)
[![Coverage Status](https://coveralls.io/repos/github/bakesaled/mesh-jack/badge.svg?branch=master)](https://coveralls.io/github/bakesaled/mesh-jack?branch=master)
### A decoupled message bus for Angular.

mesh-jack provides a way to communicate between components without having to inject lots of services.

## Install

To use mesh-jack in your project, install it via yarn:

```
yarn add @bakesaled/mesh-jack
```
or via npm:
```
npm i @bakesaled/mesh-jack
```

## Usage

#### Subscribe

```
constructor(private bus: BusService) {}

ngOnInit() {
    this.bus.channel('channel A').subscribe(message => {
      console.log('message received', message.data);
    });
}
```

#### Publish
```
constructor(private busService: BusService) {}

doPublish() {
    this.busService.publish('channel A', { source: this, data: 'my message' });
}
```

## Examples
[Demo page](https://bakesaled.github.io/mesh-jack/)
