# generator-rsk

> [Yeoman](http://yeoman.io) generator


## Getting Started

### About

This is Yeoman generator inspired by react-starter-kit by [@koistya](https://github.com/koistya)

It works similar to react-starter-kit. Also there is some features.

### How to Install

```
$ npm install -g yo
$ git clone https://github.com/proxyfabio/generator-rsk.git
$ cd generator-rsk
$ npm link
```
Now generator as available for Yeoman

### How to Use
```
$ yo rsk
```
This will extract original react-starter-kit repo.

Also you can use only features.

####Subgenerators
They allows you to create some scaffolding.
```
$ yo rsk:store name
```
This creates new `nameStore` store.

```
$ yo rsk:action name
```
This creates new `nameActions` action. Also it creates `ActionTypes.js` & `PayloadSources.js` files at `constants` directory.

```
$ yo rsk:cmp name
```
This creates new `name` react component.
When you execute `rsk:cmp` command there will be special dialog. You can create store and action for your component if it's necessary.

```
$ yo rsk:addaction name
```
This allows you to update existing components via dialog:
1. Creates new `ConstantName` for `ActionTypes`
2. Creates payload listener at chosen store if necessary.
3. Creates `name` action at component's actions file if necessary.

## License

MIT
