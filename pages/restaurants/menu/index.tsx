import { useRouter } from 'next/router'
import { useState } from 'react'
import Skeleton from "react-loading-skeleton"

import Cart from "@/components/cart"
import Layout from "@/components/layout"
import Menu from "@/components/menu"
import { useBrand, useLineItems, useMenuItems } from '@/lib/swr-hooks'

export const MenuPage = () => {
    const Router = useRouter()
    const { brand, isLoading: brandLoading } = useBrand({ locationId: Router.query.locationId })
    const { menuItems, isLoading: menuItemsLoading } = useMenuItems();
    //const [ orderId, setOrderId ] = useState(null);
    const [ orderId, setOrderId ] = useState(156);
    const { lineItems, isLoading: lineItemsLoading } = useLineItems(orderId);

    const addToOrder = async (menuItemId, quantity) => {
        try {
            if (!orderId) {
                let data = {
                    customer: Router.query?.customerId,
                    location: Router.query.locationId,
                }
                let res = await fetch(`/api/create-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
                res = await fetch(`/api/get-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                json = await res.json()
                if (!res.ok) throw Error(json.message)
                setOrderId(json.orderId)
            }
            let data = {
                order: orderId,
                menuItem: menuItemId,
                quantity,
            }
            let res = await fetch(`/api/create-line-item`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
        } catch (err) {
            throw Error(err.message)
        }
    }

    if (menuItemsLoading) {
        return (   
            <Layout title={`Menu - ${brand.name}`}>
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
                <div className="my-4" />
                <Skeleton width={180} height={24} />
                <Skeleton height={48} />
            </Layout>
        )
    }

    return (
        <Layout title={`Menu - ${brand.name}`}>
            <img src={`/logos/${brand.logo}`} />
            <h2>{brand.name}</h2>
            <Menu 
                menuItems={menuItems} 
                isCustomer={true} 
                location={Router.query.locationId} 
                addToOrder={addToOrder} 
            />
            <h3>Your Cart</h3>
            <Cart
                cartItems={lineItems}
                order={orderId}
            />
        </Layout>
    )
}

export default MenuPage
