const request = require('request')
const { isMinted, allowCors } = require('../../utils/utils')

const handler = async (req, res) => {
    try {
        const tokenId = req.query.id

        const minted = await isMinted(tokenId)
        if (!minted) return res.status(400).json({ error: 'This token has not been minted.' })

        const url = `https://ipfs.io/ipfs/QmW11W6otCedRW46hQts1WZCfWg8eMnoJfuQr7zFiJWW3D${tokenId}.png`
        request(url).pipe(res)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'An error occurred.' })
    }
}

module.exports = allowCors(handler)
