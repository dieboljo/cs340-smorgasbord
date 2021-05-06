import Link from "next/link"
import Layout from "@/components/layout"

export const IndexPage = () => {
    return (   
        <Layout home title='The Smorgasbord'>
            <Link href='/register'>RestaurantBrand / Customer / Courier Page</Link>
            <p>Allows user to login or register as a Customer, Brand, or Courier.</p>
            <Link href='/brands'>RestaurantBrands Page</Link>
            <p>Lists all RestaurantBrands and their details.</p>
            <Link href='/brands/locations'>RestaurantLocations Page</Link>
            <p>Lists all RestaurantLocations of a brand and their details.</p>
            <Link href='/brands/locations/menu-items'>MenuItems Page</Link>
            <p>Lists MenuItems of a particular location, as selected from previous page, or all of them. Also allows for creation and editing of Orders.</p>
            <Link href='/orders'>Orders Page</Link>
            <p>Lists all orders, or orders for particular customer.</p>
            <Link href='/orders/line-items'>LineItems Page</Link>
            <p>Shows details for a particular order or all orders.</p>
        </Layout>
    )
}

export default IndexPage
