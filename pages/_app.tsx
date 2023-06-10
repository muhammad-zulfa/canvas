import '../styles/styles.scss'
import type { AppProps } from 'next/app'
import { GlobalProviders } from '../src/providers/global-providers'
import Router from 'next/router'
import { useState } from 'react'
import { Splash } from '../src/components/splash'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false)
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', (url) => {
    setLoading(false)
  })
  return (
    <GlobalProviders>
      <Splash loading={loading} />
      <Component {...pageProps} />
    </GlobalProviders>
  )
}

export default MyApp
