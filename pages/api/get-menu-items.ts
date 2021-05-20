import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { locationId } = req.query
    try {
        if (!locationId) {
            const results = await query(
                `
                    SELECT *
                    FROM MenuItems
                `
            )
        } else {
            if (typeof parseInt(locationId.toString()) !== 'number') {
                return res.status(400).json({ message: '`locationId` must be a number' })
            }
            const results = await query(
            `
                SELECT *
                FROM MenuItems
                WHERE locationId = ?
            `,
            locationId
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const results= [
        {
            menuItemId: 43,
            name: "Beef Taco",
            description: "A taco filled with beef",
            price: 14.20,
            location: 34
        },
    ]
    const error = false

    return res.json({
        menuItems: results,
        isLoading: !error && !results,
        isError: error,
    })
}

export default handler
