import {
  type Client,
  type Config,
  type OptimizelyUserContext,
  createInstance,
  enums,
} from '@optimizely/optimizely-sdk';

import type {
  ResultDetails,
  UserAttributes,
  VexillologyClient,
} from './models';

export class OptimizelyClient implements VexillologyClient {
  client: Client;
  user: OptimizelyUserContext;

  constructor(
    private readonly feature: string,
    config: Config,
    user: {
      id: string;
      attributes: UserAttributes;
    },
  ) {
    // biome-ignore lint/style/noNonNullAssertion: We know that createInstance will return a Client instance
    this.client = createInstance(config)!;
    // biome-ignore lint/style/noNonNullAssertion: We know that createUserContext will return an OptimizelyUserContext instance
    this.user = this.client.createUserContext(user.id, user.attributes)!;
  }

  async ready(): Promise<unknown> {
    return this.client.onReady();
  }

  get(key: string, detailed?: boolean): unknown;
  get(key: string, detailed: true): ResultDetails;
  get(key: string, detailed = false): unknown {
    const decision = this.user.decide(this.feature);

    if (detailed) {
      return {
        key,
        value: decision.variables[key],
        _meta: {
          ...decision,
        },
      } satisfies ResultDetails;
    }

    return decision.variables[key];
  }

  async changeUser(id: string, attributes: UserAttributes): Promise<void> {
    // biome-ignore lint/style/noNonNullAssertion: We know that createUserContext will return an OptimizelyUserContext instance
    this.user = this.client.createUserContext(id, attributes)!;

    return Promise.resolve();
  }

  onUpdate(listener: () => void): void {
    this.client.notificationCenter.addNotificationListener(
      enums.NOTIFICATION_TYPES.OPTIMIZELY_CONFIG_UPDATE,
      listener,
    );
  }

  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void {
    this.user.trackEvent(eventKey, {
      ...attributes,
      metricValue: metricValue ?? null,
    });
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}
