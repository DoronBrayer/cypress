import {log} from './log'
import {find, map} from 'lodash'
import cp = require('child_process')

type FoundBrowser = {
  name: string,
  path: string
}

const browserNotFoundErr = (browsers:FoundBrowser[], name: string): BrowserNotFoundError => {
  const available = map(browsers, 'name').join(', ')

  const err: BrowserNotFoundError
    = new Error(`Browser: '${name}' not found. Available browsers are: [${available}]`) as BrowserNotFoundError
  err.specificBrowserNotFound = true
  return err
}

/** starts a browser by name and opens URL if given one */
export function launch (browsers:FoundBrowser[],
  name:string, url?:string, args:string[] = []) {
  log('launching browser %s to open %s', name, url)
  const browser = find(browsers, {name})

  if (!browser) {
    throw browserNotFoundErr(browsers, name)
  }

  if (url) {
    args.unshift(url)
  }

  return cp.spawn(browser.path, args, {stdio: 'ignore'})
}
