import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { orderId } = req.query
    try {
        if (!orderId) {
            const results = await query(
                `
                    SELECT li.lineItemId AS lineItemId, li.quantity AS quantity, 
                           li.menuItem AS menuItem, mi.name AS name, mi.price AS price
                    FROM LineItems li
                    JOIN MenuItems mi ON li.menuItem = mi.menuItemId
                `
            )
            return res.json(results)
        } else {
            const results = await query(
                `
                    SELECT li.lineItemId AS lineItemId, li.quantity AS quantity, 
                           li.menuItem AS menuItem, mi.name AS name, mi.price AS price
                    FROM LineItems li
                    JOIN MenuItems mi ON li.menuItem = mi.menuItemId
                    WHERE li.order = ?
                `,
                orderId
            )
            return res.json(results)
        }
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

export default handler
