import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "@/components/layout"

export const IndexPage = () => {
    const Router = useRouter()
    const customerId = Router.query.customerId || ''
    return (   
        <Layout home title='The Smorgasbord'>
            <Link href={`/customers?customerId=${customerId}`} as='/customers'>Customer / Courier Page</Link>
            <p>Allows user to "login" or register as a Customer, or register as a Courier.</p>
            <Link href={`/brands?customerId=${customerId}`} as='/brands'>RestaurantBrands Page</Link>
            <p>Lists all RestaurantBrands and their details.</p>
            <Link href={`/brands/locations?customerId=${customerId}`} as='/brands/locations'>RestaurantLocations Page</Link>
            <p>Lists all RestaurantLocations of a brand and their details.</p>
            <Link href={`/brands/locations/menu-items?customerId=${customerId}`} as='/brands/locations/menu-items'>MenuItems Page</Link>
            <p>Lists MenuItems of a particular location, as selected from previous page, or all of them. Also allows for creation and editing of Orders.</p>
            <Link href={`/orders?customerId=${customerId}`} as='/orders'>Orders Page</Link>
            <p>Lists all orders, or orders for particular customer.</p>
            <Link href={`/orders/line-items?customerId=${customerId}`} as='/orders/line-items'>LineItems Page</Link>
            <p>Shows details for a particular order or all orders.</p>
        </Layout>
    )
}

export default IndexPage
