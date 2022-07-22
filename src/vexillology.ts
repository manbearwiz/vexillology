import { VexillologyClient } from './models';

export class Vexillology {
  constructor(private client: VexillologyClient) {}

  async ready(): Promise<unknown> {
    return this.client.ready();
  }

  get(key: string): unknown {
    return this.client.get(key);
  }

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
