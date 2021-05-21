import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { name, description, price, location } = req.body
  try {
    if (!name || !description || !price || !location) {
      return res
        .status(400)
        .json({ message: '`name`, `description`, `price`, and `location` are all required' })
    }

    const results = await query(
      `
      INSERT INTO MenuItems (name, description, price, location)
      VALUES (?, ?, ?, ?)
      `,
      [filter.clean(name), filter.clean(description), price, location]
    )
    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    return res.json(true)
}

export default handler
