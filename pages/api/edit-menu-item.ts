import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { menuItemId, name, price, location } = req.body
  const { description } = req.body || {}
  try {
    if (!menuItemId || !name || !price || !location) {
      return res
        .status(400)
        .json({ message: '`menuItemId`, `name`, `price`, and `location`, are all required' })
    }

    const results = await query(
      `
        UPDATE MenuItems
        SET name = ?, description = ?, price = ?, location = ?
        WHERE menuItemId = ?
      `,
      [filter.clean(name), filter.clean(description), price, filter.clean(location), menuItemId]
    )

    return res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

const handlerSample: NextApiHandler = async (req, res) => {
    return res.json(true)
}

export default handlerSample
