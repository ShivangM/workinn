'use client'
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
    mainnet,
    goerli,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

type Props = {
    children: React.ReactNode
}

const { chains, publicClient } = configureChains(
    [mainnet, goerli],
    [
        alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
        publicProvider()
    ]
);

const { connectors } = getDefaultWallets({
    appName: process.env.NEXT_PUBLIC_WALLET_CONNECT_APPNAME as string,
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECTID as string,
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})

const ClientProvider = ({
    children
}: Props) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default ClientProvider