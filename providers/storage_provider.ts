import type { ApplicationService } from '@adonisjs/core/types'
import { Storage } from '../services/storage.js'
import { Exception } from '@adonisjs/core/exceptions'
import { DriverContract } from 'flydrive/types'

export default class StorageProvider {
  constructor(protected app: ApplicationService) {
    this.app = app
  }

  /**
   * Register bindings to the container
   */
  register() {}

  /**
   * The container bindings have booted
   */
  async boot() {
    this.app.container.bind('storage', async () => {
      const driver = this.app.config.get<string>(`storage.default`)
      const services = this.app.config.get<object>(`storage.services`)

      // Check driver available
      if (!services.hasOwnProperty(driver)) {
        throw new Exception('Driver drive not found')
      }

      return new Storage(this.app.config.get<DriverContract>(`storage.services.${driver}`))
    })
  }

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shut down the app
   */
  async shutdown() {}
}

declare module '@adonisjs/core/types' {
  interface ContainerBindings {
    storage: Storage
  }
}
