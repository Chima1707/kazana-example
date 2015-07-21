# kazana-example

> Kazana example app

[![NPM version](https://badge.fury.io/js/kazana-example.svg)](https://www.npmjs.com/package/kazana-example)
[![Build Status](https://travis-ci.org/eHealthAfrica/kazana-example.svg?branch=master)](https://travis-ci.org/eHealthAfrica/kazana-example)

Simple Kazana application with a [static index.html](public/index.html)
to submit income / expenses trough a free text for, which then gets
transformed into separate balance movement data, and indexed by
category.

### Setup

```
git clone git@github.com:eHealthAfrica/kazana-example.git
npm install # not working yet, see below
npm start
```

If you want to use this repository as the base for your own Kazana app, simply reset the git history

```
rm -rf .git
```

## Test

[![Dependency Status](https://david-dm.org/eHealthAfrica/kazana-example.svg)](https://david-dm.org/eHealthAfrica/kazana-example)
[![devDependency Status](https://david-dm.org/eHealthAfrica/kazana-example/dev-status.svg)](https://david-dm.org/eHealthAfrica/kazana-example#info=devDependencies)

```
npm test
```

## Credit

Brought to you by [eHealth Africa](http://ehealthafrica.org/)
— good tech for hard places.

## License

Apache-2.0
