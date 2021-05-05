import cn from "clsx"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { mutate } from "swr"

import ButtonLink from "@/components/button-link"
import Button from "@/components/button"
import styles from "./restaurant.module.scss"

export const Restaurant = ({ id, name, logo, openTime, closeTime, address, isCustomer }) => {
    const Router = useRouter()
    const [deleting, setDeleting] = useState(false)
    const customer = Router.query?.customerId
    const location = Router.query?.locationId
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

    function editRestaurant() {
        Router.push({
            pathname: '/brand/location/',
            query: `?locationId=${id}`,
            }, '/brand/location/'
        )
    }


    const customerView = (
        <div className={cn(styles.row, styles.customerRow)}>
            <div className={styles.name}>
                <img src={`/logos/${logo}`} />
                <Link 
                    href={`/restaurants/menu/?customerId=${customer}&locationId=${location}`}
                    as={`/restaurants/menu/`}
                >
                    <a>{name}</a>
                </Link>
            </div>
            <p className={styles.hours}>{`${openString} - ${closeString}`}</p>
            <p className={styles.address}>{address}</p>
        </div>
    )

    const brandView = (
        <div className={cn(styles.row, styles.brandRow)}> 
            <p className={styles.name}>{name}</p>
            <p className={styles.hours}>{`${openString} - ${closeString}`}</p>
            <p className={styles.address}>{address}</p>
            <div className={styles.actions}>
                <Button
                    onClick={editRestaurant}
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

    return (
        <div>
            {isCustomer
                ? customerView
                : brandView
            }
        </div>
    )
}

export default Restaurant
