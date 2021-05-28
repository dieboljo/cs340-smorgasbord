import MenuItem from "./menu-item"
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu.module.scss"

export const Menu = ({ menuItems, location, locationAlert, addToOrder }) => {

    return (
        <>
            <div>
                <div className={styles.row}>
                    <p className={styles.cell}>Name</p>
                    <p className={styles.cell}>Price</p>
                    <p className={styles.cell}>Description</p>
                    <p className={styles.cell}>Actions</p>
                </div>
                <MenuItemForm location={location} locationAlert={locationAlert} />
                {menuItems && menuItems.map((menuItem) => (
                    <div key={menuItem.menuItemId}>
                        <MenuItem 
                            id={menuItem.menuItemId} 
                            name={menuItem.name}
                            description={menuItem.description} 
                            price={menuItem.price}
                            location={location}
                            locationAlert={locationAlert}
                            addItem={addToOrder}
                        />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Menu
