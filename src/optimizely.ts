import { Client, Config, createInstance } from '@optimizely/optimizely-sdk';

import { VexillologyClient } from './models';

export class OptimizelyClient implements VexillologyClient {
  client: Client;
  constructor(
    private readonly userId: string,
    private readonly feature: string,
    config: Config,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
