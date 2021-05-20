import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { name, email } = req.body
  try {
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: '`name` and `email` are both required' })
    }

    const results = await query(
      INSERT INTO LineItems (`order`, quantity, menuItem) VALUES ($lineItemQuantity, $menuItemId), 
      [filter.clean(name), filter.clean(email)]
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
