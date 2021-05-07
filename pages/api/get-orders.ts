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

export default handlerSample
