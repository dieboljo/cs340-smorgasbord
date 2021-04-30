import CartItem from "./cart-item"
import { useLineItems } from "@/lib/swr-hooks"

export const Cart = ({ cartItems, updateOrder }) => {

    if (cartItems) {
        return (
            <div>
                {cartItems.map((cartItem) => (
                    <div key={cartItem.lineItemId} className='py-2'>
                        <CartItem
                            id={cartItem.LineItemId}
                            quantity={cartItem.quantity}
                            menuItem={cartItem.menuItem}
                            name={cartItem.name}
                            price={cartItem.price}
                            updateItem={updateOrder}
                        />
                    </div>
                ))}
            </div>
        )
    } else {
        return null
    }
}

export default Cart
