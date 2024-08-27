import config from '@adonisjs/core/services/config'
import { StorageDecorator } from '../types/index.js'
import { storage } from '../../services/main.js'

export const getUrl: StorageDecorator = (
  driver: string = config.get<string>('storage.default')
) => {
  return function decorateAsStorage(_target, _property, descriptor) {
    const originalGetter = descriptor.get

    descriptor.get = async function () {
      if (originalGetter && originalGetter.apply(this)) {
        const path = originalGetter.apply(this)

        // Jika sudah dalam url
        if (path.includes('https://') || path.includes('http://')) {
          return path
        }

        const exist = await storage.use(driver).exists(path)
        if (exist) {
          return storage.use(driver).getUrl(path)
        }
      }
      return null
    }
  }
}

export const getSignedUrl: StorageDecorator = (
  duration: string = '30 mins',
  driver: string = config.get<string>('storage.default')
) => {
  return function decorateAsStorage(_target, _property, descriptor) {
    const originalGetter = descriptor.get

    descriptor.get = async function () {
      if (originalGetter && originalGetter.apply(this)) {
        const path = originalGetter.apply(this)

        // Jika sudah dalam url
        if (path.includes('https://') || path.includes('http://')) {
          return path
        }

        const exist = await storage.use(driver).exists(path)
        if (exist) {
          return storage.use(driver).getSignedUrl(path, {
            expiresIn: duration,
          })
        }
      }
      return null
    }
  }
}
