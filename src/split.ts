import { SplitFactory } from '@splitsoftware/splitio';

import { VexillologyTransport } from './models';

export class SplitTransport implements VexillologyTransport {
  client: SplitIO.IClient;
  constructor(private consumer: string, settings: SplitIO.INodeSettings) {
    const factory = SplitFactory(settings);

    this.client = factory.client();
  }

  async ready(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.client.on(this.client.Event.SDK_READY, resolve);
      this.client.on(this.client.Event.SDK_READY_TIMED_OUT, reject);
    });
  }

  get(key: string): unknown {
    return this.client.getTreatment(this.consumer, key);
  }
}
