import cn from "clsx"
import { useRouter } from "next/router"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { mutate } from "swr"

import Button from "@/components/button"
import Layout from "@/components/layout"
import LineItems from "@/components/line-items"
import { useLineItems, useOrder } from "@/lib/swr-hooks"

export const LineItemsPage = () => {
    const [completing, setCompleting] = useState(false)
    const Router = useRouter()
    const orderId = Array.isArray(Router.query?.orderId)
        ? Router.query?.orderId[0]
        : Router.query?.orderId || ""
    const { order, isLoading: orderLoading } = useOrder({ orderId })
    const { lineItems, isLoading: lineItemsLoading } = useLineItems(orderId)

    const completeOrder = async (e) => {
        setCompleting(true)
        e.preventDefault()
        const data = {
            orderId,
            status: 'Complete',
        }
        try {
            const res = await fetch(`/api/edit-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate('/api/get-orders')
            mutate('/api/get-order')
        } catch (err) {
            throw Error(err.message)
        } finally {
            setCompleting(false)
        }
    }

    if (orderLoading) {
        return (   
            <Layout title={`Order #${orderId}`}>
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
        <Layout title={`Order #${orderId}`}>
            <div className='orderContainer'>
                <h2>{`Order #${order.orderId}`}</h2>
                <p className={cn('font-bold', 'text-4xl', 'my-10')}>{order.location}</p>
                <p>Status: <span className='font-bold'>{order.status}</span></p>
                {order.courier &&
                    <p>Courier: <span className='font-bold'>{order.courier}</span></p>
                }
            </div>
            <div className={cn('w-60', 'm-auto')}>
                <Button disabled={completing} onClick={completeOrder}>
                    {completing ? "Working ..." : "Complete Order"}
                </Button>
            </div>
            <LineItems lineItems={lineItems} />
        </Layout>
    )
}

export default LineItemsPage
