import dayjs from 'dayjs'
import useCountDown from 'react-countdown-hook'
import prettyMilliseconds from 'pretty-ms'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import abi from '../data/abi.json'
import TokenViewer from '../components/TokenViewer'

const date1 = dayjs('2021-08-29T19:00:00-04:00')
const date2 = dayjs(Date.now())

const initialTime = date1.diff(date2)
const interval = 100

export default function IndexPage() {
    const wallet = useWallet()

    const [status, setStatus] = useState('idle')

    const [timeLeft, { start, pause, resume, reset }] = useCountDown(initialTime, interval)

    useEffect(() => start(), [])

    const web3 = new Web3(wallet.ethereum)
    const contract = new web3.eth.Contract(abi as any, `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`)

    const buyRocks = async (amount = 0) => {
        setStatus('loading')
        try {
            if (!wallet.account) return wallet.connect()

            await contract.methods.buyRocks(amount).estimateGas({ from: wallet.account, value: web3.utils.toWei((10 * amount).toString()) })

            await contract.methods.buyRocks(amount).send({ from: wallet.account, value: web3.utils.toWei((10 * amount).toString()) })
            setStatus('complete')
            // 12
        } catch (error) {
            setStatus('error')
            console.log(error)
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 md:p-12 font-mono">
            <div className="space-y-8">
                <div className="space-y-1">
                    <p>Introducing</p>
                    <p className="text-2xl font-bold">AVAX Stones</p>
                    <p className="text-xs opacity-50"></p>
                </div>

                <div className="md:max-w-3xl space-y-1">
                    <p className="text-2xl">Stones.Art Presents</p>
                    <p className="text-4xl md:text-5xl font-bold">Limited Edition "AVAX Stones" NFTs</p>
                    <p></p>
                </div>

                <div className="text-sm">
                    {''}
                    <span className="text-green-400"></span>
                </div>

                <div>
                    <p className="text-lg">
                        The series includes 100 unique Stones minted on the Avalanche Blockchain
                    </p>
                </div>

                <div className="space-y-1">
                    <p>~100 units available at 10 AVAX each.</p>
                    <p className="text-3xl font-bold">{prettyMilliseconds(timeLeft)}</p>
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-right opacity-50">{wallet.account ? `Connected as ${wallet.account.slice(0, 6)}...${wallet.account.slice(-6)}.` : 'Wallet not connected.'}</p>

                    {!wallet.account && (
                        <button onClick={buyRocks} type="button" className="bg-white text-black rounded w-full p-4 text-xl">
                            Connect Wallet
                        </button>
                    )}

                    {wallet.account && (
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => buyRocks(1)} type="button" className="bg-white text-black rounded w-full p-4">
                                Mint x1
                            </button>
                            <button onClick={() => buyRocks(2)} type="button" className="bg-white text-black rounded w-full p-4">
                                Mint x2
                            </button>
                            <button onClick={() => buyRocks(3)} type="button" className="bg-white text-black rounded w-full p-4">
                                Mint x3
                            </button>
                        </div>
                    )}

                    {status === 'error' && <p className="text-xs text-red-400">An error ocurred. Minting may not have opened yet!</p>}
                    {status === 'complete' && <p className="text-xs text-green-400">Your NFT has been minted to your wallet.</p>}
                </div>

                <TokenViewer />

                <div>
                    <img className="rounded max-w-2xl w-full" src="/img/fuck-mike-eth.jpg" alt="" />
                </div>

                <div className="grid grid-cols-3 gap-8">
                    <img src="/img/cex-ser-card.png" alt="" />
                    <img src="/img/i-will-return-card.png" alt="" />
                    <img src="/img/no-rug-ser-card.png" alt="" />
                </div>

                <div>
                    <p className="opacity-50 text-center">
                        A{' '}
                        <a className="underline hover:no-underline" href="http://stones.art" target="_blank" rel="noreferrer">
                            Stones.Art
                        </a>{' '}
                        Project
                    </p>
                </div>
            </div>
        </div>
    )
}
