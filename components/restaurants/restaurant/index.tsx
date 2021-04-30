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

    const customerView = (
        <div className="flex ml-4">
            <img src={`/logos/${logo}`} />
            <Link href={`/restaurants/menu/${id}?customerId=${Router.query?.customerId}`}>
                <a className="font-bold py-2">{name}</a>
            </Link>
        </div>
    )

    const brandView = (
        <div className="flex ml-4">
            <p className="font-bold py-2">{name}</p>
            <ButtonLink
                href={`/brand/location/${id}`}
                className="h-5 py-0 mx-1"
            >
                Edit
            </ButtonLink>
            <Button
                disabled={deleting}
                onClick={deleteRestaurant}
                className="h-5 py-0 mx-1"
            >
                {deleting ? 'Deleting ...' : 'Delete'}
            </Button>
        </div>
    )

    return (
        <div>
            <div className="flex items-center">
                {isCustomer
                    ? customerView
                    : brandView
                }
                <p>{`${openTime} - ${closeTime}`}</p>
                <p>{address}</p>
            </div>
        </div>
    )
}

export default Restaurant
