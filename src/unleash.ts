import {
  IConfig,
  UnleashClient as UnleashProxyClient,
} from 'unleash-proxy-client';

import type {
  ResultDetails,
  UserAttributes,
  VexillologyClient,
} from './models';

export class UnleashClient implements VexillologyClient {
  private readonly client: UnleashProxyClient;
  private readonly starting: Promise<void>;

  constructor(config: IConfig) {
    this.client = new UnleashProxyClient(config);
    this.starting = this.client.start();
  }

  async changeUser(id: string, attributes: UserAttributes): Promise<void> {
    return this.client.updateContext({
      userId: id,
      properties: Object.fromEntries(
        Object.entries(attributes).map(([k, v]) => [k, v.toString()]),
      ),
    });
  }

  async ready(): Promise<unknown> {
    return this.starting;
  }

  get(key: string, detailed?: boolean): unknown;
  get(key: string, detailed: true): ResultDetails;
  get(key: string, detailed = false): unknown | ResultDetails {
    if (detailed) {
      throw new Error('Detailed get not supported for this client');
    }
    return this.client.getVariant(key);
  }

  onUpdate(listener: () => void) {
    this.client.on('update', listener);
  }

  track(eventKey: string): void {
    this.client.isEnabled(eventKey);
  }

  close(): Promise<void> {
    this.client.stop();

    return Promise.resolve();
  }
}
