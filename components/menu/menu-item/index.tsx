import { useState } from 'react'
import Link from 'next/link'
import { mutate } from 'swr'

import ButtonLink from '@/components/button-link'
import Button from '@/components/button'
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu-item.module.scss"

export const MenuItem = ({ id, name, description, price, isCustomer, location, addItem}) => {
    const [quantity, setQuantity] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState (false)

    const deleteMenuItem = async () => {
        setDeleting(true)
        let res = await fetch(`/api/delete-menu-item?id=${id}`, { method: 'DELETE' })
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
        mutate('/api/get-menu-items')
        setDeleting(false)
    }

    const customerView = (
        <>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="quantity">Qty</label>
                <input 
                    id="quantity"
                    className={styles.input}
                    type="number" 
                    min="0" 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
            </div>
            <Button onClick={() => addItem(id, quantity)}>
                Add
            </Button>
        </>
    )

    const brandView = (
        <>
            <Button disabled={deleting} onClick={() => setEditing(true)}>
                Edit
            </Button>
            <Button disabled={deleting} onClick={deleteMenuItem}>
                {deleting ? 'Deleting ...' : 'Delete'}
            </Button>
        </>
    )

    if (editing) {
        return (
            <MenuItemForm
                id={id}
                name={name}
                description={description}
                price={price}
                location={location}
                cancel={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className={styles.row}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{price}</div>
                <div className={styles.description}>{description}</div>
                {isCustomer
                    ? customerView
                    : brandView
                }
            </div>
        )
    }
}

export default MenuItem
