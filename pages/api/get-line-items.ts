import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  try {
    if (!id) {
      return res.status(400).json({ message: '`id` required' })
    }
    if (typeof parseInt(id.toString()) !== 'number') {
      return res.status(400).json({ message: '`id` must be a number' })
    }
    const results = await query(
      `
      SELECT id, title, content
      FROM entries
      WHERE id = ?
    `,
      id
    )

    return res.json(results[0])
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

export default handlerSample
