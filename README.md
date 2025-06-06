> ⚠️ DEPRECATED: This package is no longer maintained.
> You should probably use [OpenFeature](https://openfeature.dev/) instead. This project predates OpenFeature, but I think they might have a little more backing.

# vexillology

[![npm](https://img.shields.io/npm/v/vexillology?style=flat-square)](https://www.npmjs.com/package/vexillology?activeTab=versions)
[![NPM](https://img.shields.io/npm/l/vexillology?style=flat-square)](https://raw.githubusercontent.com/manbearwiz/vexillology/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/vexillology?style=flat-square)](https://www.npmjs.com/package/vexillology)
[![GitHub issues](https://img.shields.io/github/issues/manbearwiz/vexillology?style=flat-square)](https://github.com/manbearwiz/vexillology/issues)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release&style=flat-square)](https://github.com/semantic-release/semantic-release)

Pluggable feature flag SDK for Javascript

## Installation

```sh
npm install --save vexillology
```

## Usage

```ts
import { Vexillology, LaunchDarklyClient } from 'vexillology';

const user = {
  key: 'aa0ceb',
};

const client = new LaunchDarklyClient('YOUR_CLIENT_SIDE_ID', user);
const vex = new Vexillology(ld);

await vex.ready();

const value = vex.get('YOUR_FEATURE_KEY');
```
