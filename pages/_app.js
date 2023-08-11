import App from './index'
import '../styles/global.css'
// Import WalletConnectionProvider from components
import { WalletConnectProvider } from '../components/WalletConnectProvider'
// Import the solana wallet css
import '@solana/wallet-adapter-react-ui/styles.css'

function MyApp() {
    return (
        <>
            <WalletConnectProvider>
                <App />
            </WalletConnectProvider>
        </>
    )
}

export default MyApp
