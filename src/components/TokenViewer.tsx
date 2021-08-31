import { useState } from 'react'
import useSWR from 'swr'
import { useDebounce } from 'use-debounce'

export default function TokenViewer() {
    const [expand, setExpand] = useState()
    const [text, setText] = useState()
    const [value] = useDebounce(text, 1000)

    const { data } = useSWR(value ? `https://gateway.pinata.cloud/ipfs/QmUMEaAaZf15sAbXfjWjPvzDN962VzFmPiTU7tSwnvtWMA/${value}.json` : null)

    return (
        <div className="space-y-2">
            <button className="underline hover:no-underline" type="button" onClick={() => setExpand((_) => !_)}>
                View your Tokens
            </button>
            {expand && (
                <>
                    <div>
                        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your Token ID" autoFocus type="number" className="w-full p-2 bg-white bg-opacity-25" />
                    </div>

                    {data && (
                        <div className="space-y-2">
                            <p>
                                Token #{value}: {data.name ? data.name : 'Not Minted'}
                            </p>
                            {data.image && <img className="rounded" src={data.image} alt="" />}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

