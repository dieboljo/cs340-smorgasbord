import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'

import ButtonLink from '@/components/button-link'
import Button from '@/components/button'
import styles from "./cart-item.module.scss"

export const CartItem = ({ id, quantity, menuItem, name, price, updateItem}) => {
    const [newQuantity, setNewQuantity] = useState(quantity)
    const [deleting, setDeleting] = useState(false)

    const deleteMenuItem = async () => {
        setDeleting(true)
        let res = await fetch(`/api/delete-line-item?id=${id}`, { method: 'DELETE' })
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
        mutate('/api/get-line-items')
        setDeleting(false)
    }

    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}</div>
            <div className={styles.price}>{price}</div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="quantity">Qty</label>
                <input 
                    id="quantity"
                    className={styles.input}
                    type="number" 
                    min="0" 
                    value={quantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                />
            </div>
            <Button onClick={() => updateItem(id, newQuantity)}>
                Update
            </Button>
        </div>
    )
}

export default CartItem
