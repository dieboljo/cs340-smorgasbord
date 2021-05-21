import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            if (typeof name !== 'string') {
                return res.status(400).json({ message: '`name` must be a string' })
            }
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantBrands
                    WHERE name = ?
                `,
                name
            )
            return res.json(results)
        } else {
            const results = await query(
                `
                    SELECT *
                    FROM RestaurantBrands
                `
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { name } = req.query
    const results = {
        brandId: 7777,
        name: "Taco Town",
        logo: "taco-town.png"
    }
    return res.json(results);
}

export default handler
