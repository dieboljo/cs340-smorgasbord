import Link from "next/link"
import Layout from "@/components/layout"

export const IndexPage = () => {
    return (   
        <Layout home title='The Smorgasbord'>
            <Link href='/login'>Login Page</Link>
            <p>Allows user to login as a customer or a business.</p>
            <Link href='/brand/?brandId=244' as='/brand/'>Brand Page</Link>
            <p>Allows a business to view its restaurants.</p>
            <Link href='/brand/location/?locationId=255' as='/brand/location/'>Location Page</Link>
            <p>Allows a business to view and edit the menu of one restaurant location.</p>
            <Link href='/restaurants?customerId=255' as='/restaurants'>Restaurants Page</Link>
            <p>The customer's view of all listed restaurants to choose and order from.</p>
            <Link href='/restaurants/menu/?locationId=155&customerId=255' as='/restaurants/menu'>Menu Page</Link>
            <p>The customer's view of one restaurant's menu, allows customer to select items and submit order.</p>
            <Link href='/order/?orderId=155'>Order Page</Link>
            <p>An order confirmation and status page.</p>
        </Layout>
    )
}

export default IndexPage
