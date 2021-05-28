import cn from "clsx"
import { useState } from "react"

import Button from "@/components/button"
import styles from "./update.module.scss"

export const Update = ({ alert, isAlerted, label, placeholder, updateFunc, isLoading, value }) => {
    const [inputText, setInputText] = useState('');

    const submitFunc = () => {
        updateFunc(inputText);
        setInputText('');
    }

    return (
            <div className={styles.update}>
                <label>{label}:</label>
                <input 
                    className={cn(isAlerted && styles.alert)}
                    type='text' 
                    placeholder={placeholder}
                    value={inputText} 
                    onChange={(e) => {
                        setInputText(e.target.value);
                        alert(false)
                    }}
                />
                <Button disabled={isLoading} className={styles.button} onClick={submitFunc}>
                    {isLoading ? "Updating ..." : "Update"}
                </Button>
            </div>
    )
}

Update.defaultProps = {
    alert: () => {},
    isAlerted: false,
    label: '',
    placeholder: '',
    updateFunc: () => {},
    isLoading: false,
    value: '',
}

export default Update
