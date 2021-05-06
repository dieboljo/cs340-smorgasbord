import cn from "clsx"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import RestaurantForm from "@/components/restaurant-form"
import styles from "./restaurant.module.scss"

export const Restaurant = ({ id, name, logo, openTime, closeTime, address }) => {
    const Router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const [editing, setEditing] = useState(false)
    const customer = Router.query?.customerId || ''
    const openString = openTime < 12 ? openTime + 'am' : (openTime % 12) + 'pm';
    const closeString = closeTime < 12 ? closeTime + 'am' : (closeTime % 12) + 'pm';

    async function deleteRestaurant() {
        setDeleting(true)
        let res = await fetch(`/api/delete-restaurant-location?id=${id}`, {
            method: 'DELETE'
        });
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
        mutate('/api/get-restaurant-locations')
        setDeleting(false)
    }

    if (editing) {
        return (
            <RestaurantForm 
                id={id}
                name={name}
                openTime={openTime}
                closeTime={closeTime}
                address={address}
                cancel={() => setEditing(false)}
            />
        )
    } else {
        return (
            <div className={styles.row}> 
                <p className={styles.id}>{id}</p>
                <div className={styles.name}>
                    <img src={`/logos/${logo}`} />
                    <Link 
                        href={`/brands/locations/menu-items/?customerId=${customer}&locationId=${id}`}
                        as={`/brands/locations/menu-items`}
                    >
                        <a>{name}</a>
                    </Link>
                </div>
                <p className={styles.hours}>{`${openString} - ${closeString}`}</p>
                <p className={styles.address}>{address}</p>
                <div className={styles.actions}>
                    <Button
                        onClick={() => setEditing(true)}
                        className={styles.button}
                    >
                        Edit
                    </Button>
                    <Button
                        disabled={deleting}
                        onClick={deleteRestaurant}
                        className={styles.button}
                    >
                        {deleting ? 'Deleting ...' : 'Delete'}
                    </Button>
                </div>
            </div>
        )
    }
}

export default Restaurant
