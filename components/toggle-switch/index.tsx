import cn from "clsx";
import { useState } from "react";
import styles from "./toggle-switch.module.scss"

export const ToggleSwitch = ({ onToggle }) => {
    return (
        <div className={styles.switch}>
            <input 
                className={styles.switchInput} 
                id="switch"
                type="checkbox" 
                onChange={onToggle}
            />
            <label className={styles.switchLabel} htmlFor="switch"></label>
        </div>
    )
}

export default ToggleSwitch
