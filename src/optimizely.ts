import { Client, Config, createInstance } from '@optimizely/optimizely-sdk';

import { VexillologyTransport } from './models';

export class OptimizelyTransport implements VexillologyTransport {
  client: Client;
  constructor(private userId: string, private feature: string, config: Config) {
    this.client = createInstance(config)!;
  }

  async ready(): Promise<unknown> {
    return this.client.onReady();
  }

  get(key: string): unknown {
    return this.client.getFeatureVariable(this.feature, key, this.userId);
  }
}
