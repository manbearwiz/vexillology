import {
  initialize,
  LDClient,
  LDOptions,
  LDContext,
} from 'launchdarkly-js-client-sdk';

import type {
  ResultDetails,
  UserAttributes,
  VexillologyClient,
} from './models';

export class LaunchDarklyClient implements VexillologyClient {
  client: LDClient;
  constructor(
    envKey: string,
    user: LDContext,
    options?: LDOptions | undefined,
  ) {
    this.client = initialize(envKey, user, options);
  }

  async ready(): Promise<unknown> {
    return this.client.waitUntilReady();
  }

  get(key: string, detailed?: boolean): unknown;
  get(key: string, detailed: true): ResultDetails;
  get(key: string, detailed = false): unknown {
    if (detailed) {
      const detail = this.client.variationDetail(key);

      return {
        key,
        value: detail.value,
        _meta: {
          ...detail,
        },
      } satisfies ResultDetails;
    }
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
