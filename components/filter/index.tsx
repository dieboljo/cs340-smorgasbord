import { useState } from "react"

import Button from "@/components/button"
import styles from "./filter.module.scss"

export const Filter = ({ filterAttribute='', filterFunc, isLoading }) => {
    const [inputText, setInputText] = useState('');
    const filterText = filterAttribute ? ` by ${filterAttribute}` : ''

    return (
            <div className={styles.filter}>
                <label htmlFor='filter-input'>Filter{filterText}:</label>
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
