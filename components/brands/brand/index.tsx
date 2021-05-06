import cn from "clsx"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import styles from "./brand.module.scss"

export const Brand = ({ id, name, logo }) => {
    const Router = useRouter()
    const customer = Router.query?.customerId || ''

    return (
        <div className={styles.row}>
            <p className={styles.id}>{id}</p>
            <div className={styles.name}>
                <img src={`/logos/${logo}`} />
                <Link 
                    href={`/brands/locations?customerId=${customer}&brandId=${id}`}
                    as={`/brands/locations`}
                >
                    <a>{name}</a>
                </Link>
            </div>
        </div>
    )
}

export default Brand
