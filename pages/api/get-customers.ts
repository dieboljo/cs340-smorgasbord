import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.query
  try {
    if (email) {
        const results = await query(
            `
              SELECT * 
              FROM Customers
              WHERE email = ?
            `,
            email
        )
        return res.json(results)
    } else {
        const results = await query(
            `
              SELECT *
              FROM Customers
            `
        )
        return res.json(results)
    }
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