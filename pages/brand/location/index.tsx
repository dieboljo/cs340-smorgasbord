import { useRouter } from 'next/router'
import { useState } from 'react'
import Skeleton from "react-loading-skeleton"

import Layout from "@/components/layout"
import Menu from "@/components/menu"
import { useBrand, useMenuItems } from '@/lib/swr-hooks'

export const LocationPage = () => {
    const Router = useRouter()
    const { brand, isLoading: brandLoading } = useBrand({ locationId: Router.query?.locationId })
    const { menuItems, isLoading: menuItemsLoading } = useMenuItems();

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
            <div className='heading'>
                <img className='logo' src={`/logos/${brand.logo}`} />
                <h2 className='title'>{brand.name}</h2>
            </div>
            <Menu 
                menuItems={menuItems} 
                isCustomer={false} 
                location={Router.query.locationId} 
                addToOrder={null} 
            />
        </Layout>
    )
}

export default LocationPage
