import cn from "clsx"
import { useState } from 'react'
import Router from 'next/router'
import { mutate } from "swr"

import Button from '@/components/button'
import styles from "./restaurant-form.module.scss"

interface RestaurantData {
    name: string,
    openTime: string,
    closeTime: string,
    address: string,
    id?: number,
}

export const RestaurantForm = (props) => {
    const [name, setName] = useState(props.name)
    const [address, setAddress] = useState(props.address)
    const [openTime, setOpenTime] = useState(props.openTime)
    const [closeTime, setCloseTime] = useState(props.closeTime)
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        const data: RestaurantData = {
            name,
            openTime,
            closeTime,
            address,
        }
        let prefix = "create";
        if (props.id) {
            data.id = props.id;
            prefix = "edit";
        } 
        try {
            const res = await fetch(`/api/${prefix}-restaurant-location`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate('/api/get-restaurant-locations')
        } catch (err) {
            throw Error(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className={styles.row} onSubmit={submitHandler}>
            <p>{props.id || ''}</p>
            <div className={styles.field}>
                <input
                    id="name"
                    className={cn(styles.input, styles.name)}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Brand Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <div className={styles.field}>
                    <input
                        id="openTime"
                        className={cn(styles.input, styles.open)}
                        type="number"
                        step="1"
                        value={openTime}
                        placeholder="Open Time"
                        onChange={(e) => setOpenTime(parseInt(e.target.value))}
                    />
                    {'  -  '}
                    <input
                        id="closeTime"
                        className={cn(styles.input, styles.close)}
                        type="number"
                        step="1"
                        value={closeTime}
                        placeholder="Close Time"
                        onChange={(e) => setCloseTime(parseInt(e.target.value))}
                    />
                </div>
            </div>
            <div className={styles.field}>
                <input
                    type="text"
                    className={cn(styles.input, styles.address)}
                    id="address"
                    name="address"
                    value={address}
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
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

RestaurantForm.defaultProps = {
    id: null,
    name: '',
    openTime: 0.00,
    closeTime: 0.00,
    address: '',
    cancel: null,
}

export default RestaurantForm
