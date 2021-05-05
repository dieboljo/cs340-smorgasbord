import { useState } from "react"

import Button from "@/components/button"
import BrandLogin from "@/components/brand-login"
import CourierForm from "@/components/courier-form"
import CustomerLogin from "@/components/customer-login"
import ToggleSwitch from "@/components/toggle-switch"
import styles from "./login-form.module.scss"

export const LoginForm = () => {
    const [isBusiness, setIsBusiness] = useState(false)
    return (
        <div className={styles.loginContainer}>
            <ToggleSwitch
                left='Customer'
                right='Brand'
                onToggle={() => setIsBusiness(!isBusiness)}
            />
            {isBusiness ? <BrandLogin /> : <CustomerLogin />}
            <CourierForm />
        </div>
    )
}

export default LoginForm
