export interface VexillologyClient {
  ready(): Promise<unknown>;
  get(key: string): unknown;
  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void;
  close(): Promise<void>;
}
