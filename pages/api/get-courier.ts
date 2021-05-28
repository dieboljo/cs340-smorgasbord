import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  try {
    const results = await query(
      `
      SELECT courierId
      FROM Couriers
      WHERE courierId NOT IN
      (
          SELECT courier FROM Orders
          WHERE status = "Working"
      )
      `
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    const { email } = req.query
    const results = {
        customerId: 9999,
        name: "Max Diebold"
    }
    return res.json(results);
}

export default handler
