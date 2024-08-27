import app from '@adonisjs/core/services/app'
import { Storage } from './storage.js'

let storage: Storage

/**
 * Returns data storage
 */
await app.booted(async () => {
  storage = await app.container.make('storage')
})
export { storage }
