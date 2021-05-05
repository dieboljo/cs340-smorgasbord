import cn from "clsx"
import { useState } from 'react'
import Router from 'next/router'
import { mutate } from "swr"

import Button from '@/components/button'
import styles from "./menu-item-form.module.scss"

interface MenuItemData {
    name: string,
    description: string,
    price: number,
    location: number,
    id?: number,
}

export const MenuItemForm = (props) => {
    const [name, setName] = useState(props.name)
    const [description, setDescription] = useState(props.description)
    const [price, setPrice] = useState(props.price)
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        const data: MenuItemData = {
            name,
            description,
            price,
            location: props.location,
        }
        let prefix = "create";
        if (props.id) {
            data.id = props.id;
            prefix = "edit";
        } 
        try {
            const res = await fetch(`/api/${prefix}-menu-item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setSubmitting(false)
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate('/api/get-menu-items')
        } catch (err) {
            throw Error(err.message)
        }
    }

    return (
        <form className={styles.row} onSubmit={submitHandler}>
            <div className={styles.field}>
                <input
                    id="name"
                    className={cn(styles.input, styles.name)}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <input
                    id="price"
                    className={cn(styles.input, styles.price)}
                    type="number"
                    step="0.01"
                    value={price}
                    placeholder="Price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.field}>
                <textarea
                    className={cn(styles.input, styles.description)}
                    id="description"
                    name="description"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
            {props.id &&
                <Button className={styles.button} disabled={submitting} onClick={() => props.cancel()}>
                    Cancel
                </Button>
            }
            <Button className={styles.button} disabled={submitting} type="submit">
                {submitting ? 'Creating ...' : 'Create'}
            </Button>
            </div>
        </form>
    )
}

MenuItemForm.defaultProps = {
    id: null,
    name: '',
    description: '',
    price: 0.00,
    location: null,
    cancel: null,
}

export default MenuItemForm
