import {CONNECTED} from './actionList'

export function isConnected(bool) {
  return {
    type: CONNECTED,
    connected: bool
  }
}