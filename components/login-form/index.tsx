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
            <div className={styles.loginForm}>
                <h2 className={styles.heading}>Login / Register</h2>
                <ToggleSwitch
                    left='Customer'
                    right='Restaurant'
                    onToggle={() => setIsBusiness(!isBusiness)}
                />
                {isBusiness ? <BrandLogin /> : <CustomerLogin />}
            </div>
            <CourierForm />
        </div>
    )
}

export default LoginForm
