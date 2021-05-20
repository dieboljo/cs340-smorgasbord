import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { brandId } = req.query
    try {
        if (brandId) {
            if (typeof parseInt(brandId.toString()) !== 'number') {
                return res.status(400).json({ message: '`brandId` must be a number' })
            }
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantLocations
                    WHERE brandId = ?
                `,
                brandId
            )
            return res.json(results)
        } else {
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantLocations
                `
            )
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { name } = req.query
    const results = [
        {
            locationId: 7777,
            brandId: 23,
            openTime: 9,
            closeTime: 20,
            address: '1322 Plaza Drive',
        },
    ]
    return res.json(results);
}

export default handler
