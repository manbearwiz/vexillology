import {
  initialize,
  LDClient,
  LDOptions,
  LDUser,
} from 'launchdarkly-js-client-sdk';

import { UserAttributes, VexillologyClient } from './models';

export class LaunchDarklyClient implements VexillologyClient {
  client: LDClient;
  constructor(envKey: string, user: LDUser, options?: LDOptions | undefined) {
    this.client = initialize(envKey, user, options);
  }

  async ready(): Promise<unknown> {
    return this.client.waitUntilReady();
  }

  get(key: string): unknown {
    return this.client.variation(key);
  }

  onUpdate(listener: () => void) {
    this.client.on('change', listener);
  }

  async changeUser(id: string, attributes: UserAttributes): Promise<void> {
    await this.client.identify({
      key: id,
      ...attributes,
    });
  }

  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void {
    this.client.track(eventKey, attributes, metricValue);
  }

  async close(): Promise<void> {
    return this.client.close();
  }
}
