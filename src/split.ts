import { SplitFactory } from '@splitsoftware/splitio';

import type {
  ResultDetails,
  UserAttributes,
  VexillologyClient,
} from './models';

export class SplitClient implements VexillologyClient {
  client: SplitIO.IClient;

  constructor(
    private userAttributes: Record<string, string | number | boolean>,
    settings: SplitIO.INodeSettings,
  ) {
    const factory = SplitFactory(settings);

    this.client = factory.client();
  }

  async changeUser(id: string, attributes: UserAttributes): Promise<void> {
    this.userAttributes = { id, ...attributes };

    return Promise.resolve();
  }

  async ready(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.client.on(this.client.Event.SDK_READY, resolve);
      this.client.on(this.client.Event.SDK_READY_TIMED_OUT, reject);
    });
  }

  get(key: string, detailed?: boolean): unknown;
  get(key: string, detailed: true): ResultDetails;
  get(key: string, detailed = false): unknown | ResultDetails {
    if (detailed) {
      throw new Error('Detailed get not supported for this client');
    }
    return this.client.getTreatment(key, this.userAttributes);
  }

  onUpdate(listener: () => void) {
    this.client.on(this.client.Event.SDK_UPDATE, listener);
  }

  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void {
    this.client.track(eventKey, metricValue, attributes);
  }

  async close(): Promise<void> {
    return this.client.destroy();
  }
}
