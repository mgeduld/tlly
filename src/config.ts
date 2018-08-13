import * as fs from 'fs'
import * as os from 'os'
import { join } from 'path'
import { IConfig } from './interfaces/config'

const pkg = require('../package.json')

let config

const maybeCreateConfig = (configPath: string, defaultConfig: IConfig) => {
  if (!fs.existsSync(configPath)) {
    const data = JSON.stringify(defaultConfig, null, 4)
    fs.writeFileSync(configPath, data, 'utf8')
  }
}

const readConfig = (configPath: string, defaultConfig: IConfig) => {
  const content = fs.readFileSync(configPath, 'utf8')
  const config = JSON.parse(content)

  return { ...defaultConfig, ...config }
}

const setConfig = () => {
  const { default: defaultConfig } = pkg.configuration
  const configPath = join(os.homedir(), '.tlly-config.json')
  maybeCreateConfig(configPath, defaultConfig)
  config = readConfig(configPath, defaultConfig)
}

setConfig()

export const getConfig = (): IConfig => config
