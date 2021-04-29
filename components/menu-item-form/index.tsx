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
        <form onSubmit={submitHandler}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                    id="name"
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="price">Price</label>
                <input
                    id="price"
                    className={styles.input}
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
            </div>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="description">Description</label>
                <textarea
                    className={styles.input}
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <Button disabled={submitting} type="submit">
                {submitting ? 'Creating ...' : 'Create'}
            </Button>
        </form>
    )
}

MenuItemForm.defaultProps = {
    id: null,
    name: '',
    description: '',
    price: 0.00,
    customer: null,
    location: null,
}

export default MenuItemForm
