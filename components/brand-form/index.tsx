import { useState } from "react"
import { useRouter } from "next/router"
import { mutate } from "swr"

import Button from "@/components/button"
import styles from "./brand-form.module.scss"

export const BrandForm = () => {
    const [name, setName] = useState("")
    const [logoFileName, setLogoFileName] = useState("")
    const [logoFile, setLogoFile] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const Router = useRouter()

    const onLogoChange = (e) => {
        if (!e.target.files?.length) {
            setLogoFileName('');
            return
        }
        setLogoFileName(e.target.files[0].name);
        setLogoFile(e.target.files[0]);
    }

    async function submitHandler(e) {
        e.preventDefault()
        const timestamp = String(Date.now())
        let data = { 
            name,
            logo: logoFileName ? timestamp + '-' + logoFileName : '',
        }
        try {
            setSubmitting(true)
            const formData = new FormData();
            formData.set('stamp', timestamp);
            formData.set('logo', logoFile);
            let res = await fetch('/api/upload', {
                method: "POST",
                //headers: {
                //"Content-Type": "multipart/form-data",
                //},
                body: formData,
            });
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
            res = await fetch(`/api/create-restaurant-brand`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            json = await res.json()
            if (!res.ok) throw Error(json.message)
            mutate("/api/get-restaurant-brands")
        } catch (e) {
            throw Error(e.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Register a Brand</h2>
            <form onSubmit={submitHandler}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='name'>Brand Name</label>
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
                <div className={styles.submit}>
                    <Button disabled={submitting} type='submit'>
                        {submitting ? "Creating ..." : "Create"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default BrandForm
