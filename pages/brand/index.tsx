import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Skeleton from "react-loading-skeleton"

import Layout from "@/components/layout"
import Restaurants from "@/components/restaurants"
import { useBrand, useLocations } from '@/lib/swr-hooks'

export const BrandPage = () => {
    const Router = useRouter()
    const brandId = Router.query?.brandId
    const { locations, isLoading: locationsLoading } = useLocations();
    const { brand, isLoading: brandLoading } = useBrand({ brandId });

    if (locationsLoading) {
        return (   
            <Layout title='Your Locations'>
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
        <Layout title='Your Locations'>
            <div className='heading'>
                <img className='logo' src={`/logos/${brand.logo}`} />
                <h2 className='title'>{brand.name}</h2>
            </div>
            <Restaurants restaurants={locations} isCustomer={false} />
        </Layout>
    )
}

export default BrandPage
