import { Disk } from 'flydrive'
import config from '@adonisjs/core/services/config'
import { Exception } from '@adonisjs/core/exceptions'

export class Storage extends Disk {
  use(service: string): Storage {
    const services = config.get(`storage.services`) as object
    if (!services.hasOwnProperty(service)) {
      throw new Exception('Driver drive not found')
    }

    return new Storage(config.get(`storage.services.${service}`))
  }
}
