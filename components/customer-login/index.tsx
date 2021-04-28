import { useState } from "react"
import Router from "next/router"

import Button from "@/components/button"
import ToggleSwitch from "@/components/toggle-switch"
import styles from "./customer-login.module.scss"

export const CustomerLogin = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [register, toggleRegister] = useState(false)
    let buttonText = register ? "Register" : "Login";

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let prefix = register ? "create" : "get";
        let data = { 
            email,
            name,
        }
        try {
            const res = await fetch(`/api/${prefix}-customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            setSubmitting(false)
            const json = await res.json()
            if (!res.ok) throw Error(json.message)
            Router.push({
                pathname: "/restaurants",
                query: { customer: json.id },
            })
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor='email'>
                    <h3>Email</h3>
                </label>
                <input
                    id='email'
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.switch}>
                Register:
                <ToggleSwitch onToggle={() => toggleRegister(!register)} />
            </div>
            {register && 
                <div>
                    <label htmlFor='name'>
                        <h3>Name</h3>
                    </label>
                    <input
                        id='name'
                        type='name'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            }
            <Button disabled={submitting} type='submit'>
                {submitting ? "Working ..." : buttonText}
            </Button>
        </form>
    )
}

export default CustomerLogin;
