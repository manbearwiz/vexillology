import { VexillologyTransport } from './models';

export class VexillologyClient {
  constructor(private transport: VexillologyTransport) {}

  async ready(): Promise<unknown> {
    return this.transport.ready();
  }

  get(key: string): unknown {
    return this.transport.get(key);
  }
}
