/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  /**
   * Publish config file
   */
  await codemods.makeUsingStub(stubsRoot, 'config/storage.stub', {})

  /**
   * Add environment variables
   */
  await codemods.defineEnvVariables({
    /*
    |----------------------------------------------------------
    | Variables for configuring AWS S3
    |----------------------------------------------------------
    */
    AWS_S3_KEY: '',
    AWS_S3_SECRET: '',
    AWS_S3_REGION: '',
    AWS_S3_BUCKET: '',
  })

  /**
   * Validate environment variables
   */
  await codemods.defineEnvValidations({
    variables: {
      AWS_S3_KEY: `Env.schema.string.optional()`,
      AWS_S3_SECRET: 'Env.schema.string.optional()',
      AWS_S3_REGION: 'Env.schema.string.optional()',
      AWS_S3_BUCKET: 'Env.schema.string.optional()',
    },
  })

  /**
   * Add provider to rc file
   */
  await codemods.updateRcFile((rcFile) => {
    rcFile.addProvider('@adityadarma/adonis-storage/storage_provider')
  })
}
