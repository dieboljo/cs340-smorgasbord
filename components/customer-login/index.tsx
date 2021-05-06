import { useState } from "react"
import { useRouter} from "next/router"

import Button from "@/components/button"
import styles from "./customer-login.module.scss"

export const CustomerLogin = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [register, toggleRegister] = useState(false)
    const Router = useRouter()
    let buttonText = register ? "Register" : "Login";
    let toggleText = register ? "login" : "register";

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let data = { 
            email,
            name,
        }
        try {
            if (register) {
                let res = await fetch(`/api/create-customer`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
            }
            let res = await fetch(`/api/get-customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setSubmitting(false)
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push({
                pathname: "/brands",
                query: { customerId: json.customerId },
            }, '/brands')
        } catch (err) {
            throw Error(err.message)
        }
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='customer-email'>Email</label>
                <input
                    className={styles.input}
                    id='customer-email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {register && 
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='customer-name'>Name</label>
                    <input
                        className={styles.input}
                        id='customer-name'
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            }
            <div className={styles.toggle} onClick={() => toggleRegister(!register)}>{toggleText}</div>
            <div className={styles.submit}>
                <Button disabled={submitting} type='submit'>
                    {submitting ? "Working ..." : buttonText}
                </Button>
            </div>
        </form>
    )
}

export default CustomerLogin;
