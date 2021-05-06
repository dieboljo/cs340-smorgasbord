import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"

import Cart from "@/components/cart"
import Layout from "@/components/layout"
import Menu from "@/components/menu"
import Update from "@/components/update"
import { useLineItems, useMenuItems, useOrder } from '@/lib/swr-hooks'

export const MenuPage = () => {
    const Router = useRouter()
    const [locationId, setLocationId] = useState(
        Array.isArray(Router.query?.locationId)
        ? Router.query?.locationId[0]
        : Router.query?.locationId || ''
    )
    const [customerId, setCustomerId] = useState(
        Array.isArray(Router.query?.customerId)
        ? Router.query?.customerId[0]
        : Router.query?.customerId || ''
    )
    //const [ orderId, setOrderId ] = useState(null);
    const { order, isLoading: orderLoading } = useOrder({ locationId, customerId });
    const { menuItems, isLoading: menuItemsLoading } = useMenuItems(locationId);
    const { lineItems, isLoading: lineItemsLoading } = useLineItems(
        orderLoading ? null : order.orderId
    );

    const addToOrder = async (menuItemId, quantity) => {
        if (!orderLoading) {
            try {
                let data = {
                    order: order.orderId,
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
    }

    if (menuItemsLoading) {
        return (   
            <Layout title='Menu Items'>
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
        <Layout title='Menu Items'>
            <div className='heading'>
                <h2 className='title'>Menu Items</h2>
            </div>
            <div>
            <Update
                label='Customer ID'
                updateFunc={setCustomerId}
                isLoading={orderLoading}
            />
            <Update
                label='Location ID'
                updateFunc={setLocationId}
                isLoading={orderLoading}
            />
            </div>
            <Menu 
                menuItems={menuItems} 
                location={locationId}
                addToOrder={addToOrder} 
            />
            {!orderLoading &&
                <Cart
                    cartItems={lineItems}
                    order={order.orderId}
                />
            }
        </Layout>
    )
}

export default MenuPage
