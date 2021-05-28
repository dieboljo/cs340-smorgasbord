import cn from "clsx"
import { useState } from 'react'
import Router from 'next/router'
import { mutate } from "swr"

import Button from '@/components/button'
import styles from "./restaurant-form.module.scss"

interface RestaurantData {
    brand: number,
    openTime: string,
    closeTime: string,
    address: string,
    locationId?: number,
}

export const RestaurantForm = (props) => {
    const [brandId, setBrandId] = useState(props.id)
    const [address, setAddress] = useState(props.address)
    const [openTime, setOpenTime] = useState(props.openTime)
    const [closeTime, setCloseTime] = useState(props.closeTime)
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        setSubmitting(true)
        e.preventDefault()
        const data: RestaurantData = {
            brand: brandId,
            openTime,
            closeTime,
            address,
        }
        let prefix = "create";
        if (props.id) {
            data.locationId = props.id;
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
            setBrandId(props.id)
            setAddress(props.address)
            setOpenTime(props.openTime)
            setCloseTime(props.closeTime)
            setSubmitting(false)
            props.cancel()
        }
    }

    return (
        <form className={styles.row}> 
            <p>{props.id || ''}</p>
            <div className={styles.field}>
                <input
                    id="brandId"
                    className={cn(styles.input, styles.name)}
                    type="text"
                    name="brandId"
                    value={brandId}
                    placeholder="Brand ID"
                    onChange={(e) => setBrandId(e.target.value)}
                />
            </div>
            <div>
                <div className={styles.field}>
                    <input
                        id="openTime"
                        className={cn(styles.input, styles.open)}
                        type="time"
                        step="600"
                        value={openTime}
                        onChange={(e) => setOpenTime(e.target.value)}
                    />
                    {'  -  '}
                    <input
                        id="closeTime"
                        className={cn(styles.input, styles.close)}
                        type="time"
                        step="600"
                        value={closeTime}
                        onChange={(e) => setCloseTime(e.target.value)}
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
            <Button className={styles.button} disabled={submitting} type="button" onClick={submitHandler}>
                {submitting ? 'Creating ...' : 'Create'}
            </Button>
            </div>
        </form>
    )
}

RestaurantForm.defaultProps = {
    id: '',
    name: '',
    openTime: "00:00",
    closeTime: "23:59",
    address: '',
    cancel: () => {},
}

export default RestaurantForm
