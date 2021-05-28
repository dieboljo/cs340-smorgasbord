import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'

import ButtonLink from '@/components/button-link'
import Button from '@/components/button'
import styles from "./cart-item.module.scss"

export const CartItem = ({ id, quantity, menuItem, name, price }) => {
    const [newQuantity, setNewQuantity] = useState(quantity)
    const [removing, setRemoving] = useState(false)
    const [updating, setUpdating] = useState(false)
    const totalPrice = (price * quantity).toFixed(2)

    const removeItem = async () => {
        try {
            setRemoving(true)
            let res = await fetch(`/api/delete-line-item?id=${id}`, { method: 'DELETE' })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate('/api/get-line-items')
        } catch(e) {
            throw Error(e.message)
        } finally {
            setRemoving(false)
        }
    }

    const updateItem = async () => {
        try {
            setUpdating(true)
            if (newQuantity == 0) {
                console.log('removing')
                return removeItem()
            }
            let data = {
                lineItemId: id,
                quantity: newQuantity,
            }
            let res = await fetch(`/api/edit-line-item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (err) {
            throw Error(err.message)
        } finally {
            setUpdating(false)
        }
    }

    return (
        <div className={styles.row}>
            <div className={styles.name}>{name}</div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="quantity">Qty: </label>
                <input 
                    id="quantity"
                    className={styles.input}
                    type="number" 
                    min="0" 
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                />
            </div>
            <div className={styles.price}>{totalPrice}</div>
            <div>
                <Button className={styles.button} disabled={updating} onClick={() => updateItem()}>
                    {updating ? "Updating ..." : "Update"}
                </Button>
                <Button className={styles.button} disabled={removing} onClick={() => removeItem()}>
                    {removing ? "Removing ..." : "Remove"}
                </Button>
            </div>
        </div>
    )
}

export default CartItem
