import '../styles/global.css'
import { UseWalletProvider } from 'use-wallet'
import Meta from '../components/Meta'

export default function App({ Component, pageProps }) {
    return (
        <>
            <Meta />
            <UseWalletProvider chainId={43114}>
                <Component {...pageProps} />
            </UseWalletProvider>
        </>
    )
}
