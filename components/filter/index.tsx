import { useState } from "react"

import Button from "@/components/button"
import styles from "./filter.module.scss"

export const Filter = ({ filterFunc, isLoading }) => {
    const [inputText, setInputText] = useState('');

    return (
            <div className={styles.filter}>
                <label htmlFor='filter-input'>Filter Restaurants:</label>
                <input 
                    type='text' 
                    value={inputText} 
                    onChange={(e) => setInputText(e.target.value)}
                    id='filter-input'
                />
                <Button disabled={isLoading} className={styles.button} onClick={() => filterFunc(inputText)}>
                    {isLoading ? "Filtering ..." : "Filter"}
                </Button>
            </div>
    )
}

export default Filter
