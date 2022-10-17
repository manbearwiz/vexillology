export interface VexillologyClient {
  ready(): Promise<unknown>;
  get(key: string): unknown;
  onUpdate(listener: () => void): void;
  track(
    eventKey: string,
    metricValue?: number | undefined,
    attributes?: Record<string, string | number | boolean | null>,
  ): void;
  changeUser(id: string, attributes: UserAttributes): Promise<void>;
  close(): Promise<void>;
}

export type UserAttributes = Record<string, string | number | boolean>;
