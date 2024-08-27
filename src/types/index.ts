import { DriveManagerOptions, DriverContract } from 'flydrive/types'

/**
 * Storage config
 */
export type StorageConfig<KnownStorages extends Record<string, object>> = {
  default: keyof KnownStorages
  services: KnownStorages
}

/**
 * Define the disk config. The config object must have a default property
 * pointing to the key within the disk object.
 */
export declare function defineConfig<KnownStorages extends Record<string, () => DriverContract>>(
  config: StorageConfig<KnownStorages>
): StorageConfig<KnownStorages>

export interface StorageLists {}

/**
 * Infer the storage drivers from the user config
 */
export type InferStorageProviders<
  T extends DriveManagerOptions<Record<string, () => DriverContract>>,
> = T['services']
