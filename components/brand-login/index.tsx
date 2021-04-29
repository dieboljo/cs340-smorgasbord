import { useState } from "react"
import Router from "next/router"

import Button from "@/components/button"
import styles from "./brand-login.module.scss"

export const BrandLogin = () => {
    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [logoFileName, setLogoFileName] = useState("")
    const [logoFile, setLogoFile] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [register, toggleRegister] = useState(false)
    let buttonText = register ? "Register" : "Login";
    let toggleText = register ? "login" : "register";

    const onLogoChange = (e) => {
        if (!e.target.files?.length) {
            return;
        }
        setLogoFileName(e.target.files[0].name);
        setLogoFile(e.target.files[0]);
    }

    const registerFields = (
        <>
            <div className={styles.field}>
                <label className={styles.label} htmlFor='name'>Name</label>
                <input
                    className={styles.input}
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className={`${styles.field} ${styles.fileField}`}>
                <label className={styles.label} htmlFor="logo">Brand logo (PNG, JPG)</label>
                <input 
                    className={`${styles.input} ${styles.fileInput}`}
                    type="file" 
                    id="logo" 
                    name="logo" 
                    accept=".jpg, .jpeg, .png" 
                    onChange={onLogoChange}
                />
            </div>
        </>
    )
    const loginFields = (
        <div className={styles.field}>
            <label className={styles.label} htmlFor='id'>Business ID</label>
            <input
                className={styles.input}
                id='id'
                type='number'
                name='id'
                value={id}
                onChange={(e) => setId(parseInt(e.target.value))}
            />
        </div>
    )

    async function submitHandler(e) {
        setSubmitting(true)
        e.preventDefault()
        let prefix = register ? "create" : "get";
        let sqlData = { 
            id,
            name,
            logoFileName
        }
        const formData = new FormData();
        formData.set('logo', logoFile);
        try {
            const uploadRes = await fetch('/api/upload', {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });
            const uploadJson = await uploadRes.json()
            if (!uploadRes.ok) throw Error(uploadJson.message)
            let sqlRes = await fetch(`/api/${prefix}-restaurant-brands`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(sqlData),
            })
            setSubmitting(false)
            let sqlJson = await sqlRes.json()
            if (!sqlRes.ok) throw Error(sqlJson.message)
            Router.push(`/brand/${sqlJson.id}`)
        } catch (e) {
            throw Error(e.message)
        }
    }

    return (
        <form onSubmit={submitHandler}>
            {register
                ? registerFields 
                : loginFields
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

export default BrandLogin;
