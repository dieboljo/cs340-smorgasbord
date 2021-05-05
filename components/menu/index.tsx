import MenuItem from "./menu-item"
import MenuItemForm from "@/components/menu-item-form"
import styles from "./menu.module.scss"

export const Menu = ({ menuItems, isCustomer, location, addToOrder }) => {

    return (
        <>
            <div>
                <div className={styles.row}>
                    <p className={styles.cell}>Name</p>
                    <p className={styles.cell}>Price</p>
                    <p className={styles.cell}>Description</p>
                    <p className={styles.cell}>Actions</p>
                </div>
                {menuItems && menuItems.map((menuItem) => (
                    <div key={menuItem.menuItemId}>
                        <MenuItem 
                            id={menuItem.menuItemId} 
                            name={menuItem.name}
                            description={menuItem.description} 
                            price={menuItem.price}
                            isCustomer={isCustomer}
                            location={location}
                            addItem={addToOrder}
                        />
                    </div>
                ))}
            </div>
            {!isCustomer &&
                <MenuItemForm location={location} />
            }
        </>
    )
}

export default Menu
