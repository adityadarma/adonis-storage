import { DriveManagerOptions, DriverContract } from 'flydrive/types'

export function defineConfig<KnownStorages extends Record<string, () => DriverContract>>(
  config: DriveManagerOptions<KnownStorages>
): DriveManagerOptions<KnownStorages> & {
  default?: keyof KnownStorages
  services: {
    [T in keyof KnownStorages]: KnownStorages[T]
  }
} {
  return config
}
