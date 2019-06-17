import * as blockstack from 'blockstack'

const loginWithBlockstack = () => {
  const envPath = process.env.NODE_ENV === 'development' ? '-localhost' : ''
  const redirectPath = `/redirect-web${envPath}.html`

  const userSession = new blockstack.UserSession()
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

export default loginWithBlockstack
