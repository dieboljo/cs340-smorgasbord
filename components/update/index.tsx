import { useState } from "react"

import Button from "@/components/button"
import styles from "./update.module.scss"

export const Update = ({ label='', placeholder='', updateFunc, isLoading, value='' }) => {
    const [inputText, setInputText] = useState('');

    const submitFunc = () => {
        updateFunc(inputText);
        setInputText('');
    }

    return (
            <div className={styles.update}>
                <label>{label}:</label>
                <input 
                    type='text' 
                    placeholder={placeholder}
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                />
                <Button disabled={isLoading} className={styles.button} onClick={submitFunc}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

export default Update
