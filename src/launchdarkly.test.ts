import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LaunchDarklyClient } from './launchdarkly';

const { internalClient } = vi.hoisted(() => ({
  internalClient: {
    waitUntilReady: vi.fn(() => Promise.resolve()),
    variation: vi.fn(() => true),
    variationDetail: vi.fn(() => ({
      value: true,
    })),
    on: vi.fn(),
    identify: vi.fn(() => Promise.resolve()),
    track: vi.fn(),
    close: vi.fn(() => Promise.resolve()),
  },
}));

vi.mock('launchdarkly-js-client-sdk', () => ({
  initialize: vi.fn(() => internalClient),
}));

describe('LaunchDarklyClient', () => {
  let client: LaunchDarklyClient;

  beforeEach(() => {
    client = new LaunchDarklyClient('key', {});
  });

  it('should be able to create a new LaunchDarklyClient instance', () => {
    expect(client).toBeInstanceOf(LaunchDarklyClient);
  });

  it('should be able to get a feature flag value', () => {
    internalClient.variation.mockReturnValueOnce(false);
    expect(client.get('feature-flag-key')).toBe(false);

    internalClient.variation.mockReturnValueOnce(true);
    expect(client.get('feature-flag-key')).toBe(true);

    internalClient.variation.mockReturnValueOnce(false);
    expect(client.get('feature-flag-key')).toBe(false);
  });

  it('should be able to get a feature flag value with details', () => {
    internalClient.variationDetail.mockReturnValueOnce({
      value: false,
    });
    expect(client.get('feature-flag-key', true)).toEqual({
      key: 'feature-flag-key',
      value: false,
      _meta: {
        value: false,
      },
    });

    internalClient.variationDetail.mockReturnValueOnce({
      value: true,
    });
    expect(client.get('feature-flag-key', true)).toEqual({
      key: 'feature-flag-key',
      value: true,
      _meta: {
        value: true,
      },
    });
  });

  it('should be able to change the user', async () => {
    internalClient.identify.mockReturnValueOnce(Promise.resolve());

    await client.changeUser('new-id', { name: 'new-name' });

    expect(internalClient.identify).toHaveBeenCalledWith({
      key: 'new-id',
      name: 'new-name',
    });
  });

  describe('onUpdate', () => {
    it('should be able to listen for updates', () => {
      const listener = vi.fn();
      client.onUpdate(listener);

      expect(internalClient.on).toHaveBeenCalledWith('change', listener);
    });
  });
});
