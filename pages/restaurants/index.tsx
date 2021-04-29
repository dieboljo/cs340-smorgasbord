import { useRouter } from 'next/router'
import Skeleton from "react-loading-skeleton"

import Layout from "@/components/layout"
import Restaurants from "@/components/restaurants"
import { useRestaurants } from '@/lib/swr-hooks'

export const RestaurantsPage = () => {
    const { restaurants, isLoading } = useRestaurants();
    const router = useRouter()
    const customer = router.query?.customer

    if (isLoading) {
        return (   
            <Layout title='Our Partners'>
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
        <Layout title='Our Partners'>
            <Restaurants restaurants={restaurants} customer={customer} />
        </Layout>
    )
}

export default RestaurantsPage
