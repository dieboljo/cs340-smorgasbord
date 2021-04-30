import Skeleton from "react-loading-skeleton"

import LoginForm from "@/components/login-form"
import Layout from "@/components/layout"
import Splash from "@/components/splash"

export const HomePage = () => {
    return (   
        <Layout home title='The Smorgasbord'>
            <Splash>
                <LoginForm />
            </Splash>
        </Layout>
    )
}

export default HomePage
