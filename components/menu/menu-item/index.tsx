import { useState } from "react"
import Link from "next/link"
import { mutate } from "swr"

import ButtonLink from "@/components/button-link"
import Button from "@/components/button"
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu-item.module.scss"

export const MenuItem = ({
    id,
    name,
    description,
    price,
    location,
    locationAlert,
    addItem,
}) => {
    const [quantity, setQuantity] = useState(0)
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)

    const deleteMenuItem = async () => {
        try {
            setDeleting(true)
            let res = await fetch(`/api/delete-menu-item?menuItemId=${id}`, {
                method: "DELETE",
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate("/api/get-menu-items")
        } catch(e) {
            throw Error(e.message)
        } finally {
            setDeleting(false)
        }
    }

    if (editing) {
        return (
            <MenuItemForm
                id={id}
                name={name}
                description={description}
                price={price}
                location={location}
                locationAlert={locationAlert}
                cancel={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className={styles.row}>
                <div className={styles.name}>{name}</div>
                <div className={styles.price}>{price.toFixed(2)}</div>
                <div className={styles.description}>{description}</div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='quantity'>
                        Qty:
                    </label>
                    <input
                        id='quantity'
                        className={styles.input}
                        type='number'
                        min='0'
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <Button className={styles.button} onClick={() => addItem(id, quantity)}>Add</Button>
                    <Button
                        className={styles.button}
                        disabled={deleting}
                        onClick={() => setEditing(true)}>
                        Edit
                    </Button>
                    <Button className={styles.button} disabled={deleting} onClick={deleteMenuItem}>
                        {deleting ? "Deleting ..." : "Delete"}
                    </Button>
                </div>
            </div>
        )
    }
}

MenuItem.defaultProps = {
    id: '',
    name: '',
    description: '',
    price: 0.00,
    location: '',
    locationAlert: () => {},
    addItem: () => {},
}

export default MenuItem
