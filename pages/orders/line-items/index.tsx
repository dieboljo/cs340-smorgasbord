import { useRouter } from "next/router"
import Skeleton from "react-loading-skeleton"

import Layout from "@/components/layout"
import { useOrder } from "@/lib/swr-hooks"

export const LineItemsPage = () => {
    const Router = useRouter()
    const orderId = Router.query?.orderId
    const { order, isLoading } = useOrder(orderId)

    if (isLoading) {
        return (   
            <Layout title={`Order ${orderId}`}>
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
        <Layout title={`Order ${orderId}`}>
            <h2>{`Order #${order.orderId} for ${order.customer}`}</h2>
            <p>{`from ${order.location}`}</p>
            <p>{`is ${order.status}`}</p>
            <p>{`and will be delivered by ${order.courier}`}</p>
        </Layout>
    )
}

export default LineItemsPage
