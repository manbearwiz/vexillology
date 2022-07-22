# vexillology

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
