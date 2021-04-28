import Skeleton from "react-loading-skeleton"

import CustomerLogin from "@/components/customer-login"
import Layout from "@/components/layout"
import Splash from "@/components/splash"

export const Home = () => {
    return (   
        <Layout home title='The Smorgasbord'>
            <Splash>
                <CustomerLogin />
            </Splash>
        </Layout>
    )
}

export default Home
