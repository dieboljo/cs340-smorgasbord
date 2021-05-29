import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

import Button from "@/components/button"
import styles from "./order.module.scss"

export const Order = ({
    id,
    customer,
    location,
    courier,
    status,
}) => {
    const Router = useRouter()
    const detailsSubmit = () => {
        Router.push({
            pathname: '/orders/line-items',
            query: { orderId: id },
        },
        '/orders/line-items')
    }

    return (
        <div className={styles.row}>
            <div>{id}</div>
            <div>{customer}</div>
            <div>{location}</div>
            <div>{courier}</div>
            <div>{status}</div>
            <div>
                <Button className={styles.button} onClick={() => detailsSubmit()}>
                    Details
                </Button>
            </div>
        </div>
    )
}

export default Order
