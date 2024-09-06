import { DriveManagerOptions, DriverContract } from 'flydrive/types'

/**
 * Storage config
 */
export type StorageConfig<KnownStorages extends Record<string, object>> = {
  default: keyof KnownStorages
  services: KnownStorages
}

export interface StorageLists {}

/**
 * Infer the storage drivers from the user config
 */
export type InferStorageProviders<
  T extends DriveManagerOptions<Record<string, () => DriverContract>>,
> = T['services']

export type DecoratorStorage = (target: any, property: any, descriptor: PropertyDescriptor) => void

export type StorageDecorator = (duration?: string, driver?: string) => DecoratorStorage
