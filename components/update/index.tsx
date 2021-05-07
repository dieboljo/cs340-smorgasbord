import { useState } from "react"

import Button from "@/components/button"
import styles from "./update.module.scss"

export const Update = ({ label='', placeholder='', updateFunc, isLoading }) => {
    const [inputText, setInputText] = useState('');

    return (
            <div className={styles.update}>
                <label htmlFor='update-input'>{label}:</label>
                <input 
                    type='text' 
                    placeholder={placeholder}
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                    id='update-input'
                />
                <Button disabled={isLoading} className={styles.button} onClick={() => updateFunc(inputText)}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

export default Update
