import Head from 'next/head'

const Meta = () => {
    const title = 'Avax Stones'
    const description = 'Avax Stones. The official NFT. 100 available at 10 AVAX.'
    const url = 'https://avax.chain.stones'

    return (
        <Head>
            <title>Avax Stones</title>
            <meta name="description" content={description} />
            <meta property="og:type" content="website" />
            <meta name="og:title" property="og:title" content={title} />
            <meta name="og:description" property="og:description" content={description} />
            <meta property="og:site_name" content={title} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content={url} />
            <link rel="icon" type="image/png" href="https://gateway.pinata.cloud/ipfs/QmRmUH3ADEpNPFPEbhf29j7ZrXo4fhJQAkB3GZwEdK6tjv" />
            <meta property="og:image" content="https://gateway.pinata.cloud/ipfs/QmRmUH3ADEpNPFPEbhf29j7ZrXo4fhJQAkB3GZwEdK6tjv" />
            <meta name="twitter:image" content="https://gateway.pinata.cloud/ipfs/QmRmUH3ADEpNPFPEbhf29j7ZrXo4fhJQAkB3GZwEdK6tjv" />
        </Head>
    )
}

export default Meta
