import * as blockstack from 'blockstack'
import db from '../db'

const userSession = new blockstack.UserSession()

export const loginWithBlockstack = () => {
  const envPath = process.env.NODE_ENV === 'development' ? '-localhost' : ''
  const redirectPath = `/redirect-web${envPath}.html`
  const appDomain = 'https://lannister.capital'
  const transitPrivateKey = userSession.generateAndStoreTransitKey()
  const redirectURI = appDomain + redirectPath
  const manifestURI = appDomain + '/manifest.json'
  const scopes = ['store_write']
  const authRequest = blockstack.makeAuthRequest(
    transitPrivateKey,
    redirectURI,
    manifestURI,
    scopes,
    appDomain
  )

  blockstack.redirectToSignInWithAuthRequest(authRequest)
}

export const syncDb = () => {
  console.log('sync db')
  if (userSession.isUserSignedIn()) {
    blockstack.getFile('db.json').then(file => {
      if (file) {
        downloadDb()
      } else {
        uploadDb()
      }
    })
  }
}

export const uploadDb = () => {
  if (userSession.isUserSignedIn()) {
    const syncDb = db.getState()

    blockstack
      .putFile('db.json', JSON.stringify(syncDb), { encrypt: true })
      .then(_ => {
        console.log('Written to Blockstack')
      })
  }
}

export const downloadDb = () => {
  if (userSession.isUserSignedIn()) {
    blockstack.getFile('db.json').then(file => {
      const syncedInfo = JSON.parse(String(file))
      db.set('holdings', syncedInfo.holdings).write()
      db.set('db_version', syncedInfo.db_version).write()
    })
  }
}

export const getUsername = () => {
  if (userSession.isUserSignedIn()) {
    return `@${blockstack.loadUserData().username}`
  } else {
    return ''
  }
}

export const handleSignIn = () => {
  if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(_ => {
      syncDb()
    })
  }
}

export const logoutFromBlockstack = () => {
  const userSession = new blockstack.UserSession()
  userSession.signUserOut()
}

export const isLoggedIn = () => {
  return userSession.isUserSignedIn()
}
