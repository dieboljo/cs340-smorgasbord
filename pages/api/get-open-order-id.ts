import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
    const { location, customer } = req.body
    try {
        if (!location || !customer) {
            return res.status(400).json({ message: '`location` and `customer` required' })
        }
        if (typeof parseInt(location.toString()) !== 'number'
                || typeof parseInt(customer.toString()) !== 'number') {
            return res.status(400).json({ message: '`location` and `customer` must be numbers' })
        }
        const results = await query(
            `
                SELECT orderId
                FROM Orders
                WHERE customer = ?
                    AND location = ?
                    AND status = "Working"
            `,
            [customer, location]
        )
        return res.json(results[0])
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { customerId, locationId } = req.query
    const results = {
        orderId: 322,
        customer: 9999,
        location: 34,
        courier: 666,
        status: 'working',
    }
    return res.json(results);
}

export default handler
