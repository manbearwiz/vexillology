import { VexillologyClient } from './models';

export class Vexillology {
  constructor(private readonly client: VexillologyClient) {}

  /**
   * Returns a Promise that tracks the client's initialization process.
   * @returns A Promise that will resolve once the client is done initializing.
   */
  async ready(): Promise<unknown> {
    return this.client.ready();
  }

  /**
   * Returns the value of the feature flag for the current user.
   * @param key - The unique key of the feature flag to get the value from.
   * @returns The value of the feature flag.
   */
  get(key: string): unknown {
    return this.client.get(key);
  }

  /**
   * Tracks an event for use in an A/B test.
   * @param eventKey The key of the event to be tracked.
   * @param metricValue An optional numeric value to associate with the event.
   * @param attributes A map of custom key-value pairs specifying additional information to associate with the event.
   */
  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void {
    this.client.track(eventKey, metricValue, attributes);
  }

  async close(): Promise<void> {
    return this.client.close();
  }
}
