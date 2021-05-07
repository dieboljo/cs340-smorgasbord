import { useState } from "react"

import Button from "@/components/button"
import CourierForm from "@/components/courier-form"
import CustomerLogin from "@/components/customer-login"
import styles from "./login-form.module.scss"

export const LoginForm = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <CustomerLogin />
            </div>
            <CourierForm />
        </div>
    )
}

export default LoginForm
