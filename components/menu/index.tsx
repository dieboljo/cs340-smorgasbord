import MenuItem from "./menu-item"
import MenuItemForm from "@/components/menu-item-form"

export const Menu = ({ menuItems, customer, location }) => {

    if (menuItems) {
        return (
            <div>
                {menuItems.map((menuItem) => (
                    <div key={menuItem.menuItemId} className='py-2'>
                        <MenuItem 
                            id={menuItem.menuItemId} 
                            name={menuItem.name}
                            description={menuItem.description} 
                            price={menuItem.price}
                            customer={customer}
                            location={location}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <MenuItemForm location={location} />
    )
}

export default Menu
