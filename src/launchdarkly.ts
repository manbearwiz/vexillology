import * as LDClient from 'launchdarkly-js-client-sdk';
import { VexillologyTransport } from './models';

export class LaunchDarklyTransport implements VexillologyTransport {
  client: LDClient.LDClient;
  constructor(
    envKey: string,
    user: LDClient.LDUser,
    options?: LDClient.LDOptions | undefined,
  ) {
    this.client = LDClient.initialize(envKey, user, options);
  }

  async ready(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.client.on('ready', resolve);
      this.client.on('error', reject);
    });
  }

  get(key: string): unknown {
    return this.client.variation(key);
  }
}
