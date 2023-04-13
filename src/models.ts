export interface VexillologyClient {
  ready(): Promise<unknown>;
  get(key: string, detailed?: boolean): unknown;
  get(key: string, detailed: true): ResultDetails;
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

export interface ResultDetails {
  key: string;
  value: unknown;
  _meta: unknown;
}
