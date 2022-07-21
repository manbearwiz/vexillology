export interface VexillologyTransport {
  ready(): Promise<unknown>;
  get(key: string): unknown;
}
