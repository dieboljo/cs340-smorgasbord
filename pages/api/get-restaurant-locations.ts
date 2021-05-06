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

export default handlerSample
