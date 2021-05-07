import { useRouter } from 'next/router'
import { useState } from "react"
import Skeleton from "react-loading-skeleton"

import Button from "@/components/button"
import Filter from "@/components/filter"
import Layout from "@/components/layout"
import Restaurants from "@/components/restaurants"
import { useRestaurants } from '@/lib/swr-hooks'

export const RestaurantsPage = () => {
    const [filterString, setFilterString] = useState('');
    const { restaurants, isLoading } = useRestaurants(filterString);

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
            <Filter filterFunc={setFilterString} isLoading={isLoading} />
            <Restaurants restaurants={restaurants} isCustomer={true} />
        </Layout>
    )
}

export default RestaurantsPage
