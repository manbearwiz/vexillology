import { Client, Config, createInstance } from '@optimizely/optimizely-sdk';

import { VexillologyClient } from './models';

export class OptimizelyClient implements VexillologyClient {
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

  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void {
    this.client.track(eventKey, this.userId, { ...attributes, metricValue });
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
