import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { orderId } = req.query
    try {
        if (!orderId) {
            const results = await query(
                `
                    SELECT *
                    FROM LineItems
                `
            )
            return res.json(results)
        } else {
            const results = await query(
                'SELECT * FROM LineItems li WHERE `li.order` = ?',
                orderId
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { orderId } = req.query
    const results = [
        {
            lineItemId: 259,
            order: 577,
            quantity: 4,
            menuItem: 233,
        },
        {
            lineItemId: 245,
            order: 244,
            quantity: 2,
            menuItem: 155,
        },
    ]
    return res.json(results);
}

export default handler
