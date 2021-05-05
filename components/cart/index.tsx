import { useState } from "react"
import { useRouter } from "next/router"

import CartItem from "./cart-item"
import Button from "@/components/button"
import ToggleSwitch from "@/components/toggle-switch"
import { useLineItems } from "@/lib/swr-hooks"
import styles from "./cart.module.scss"

export const Cart = ({ cartItems, order }) => {
    const [isDelivery, setIsDelivery] = useState(true)
    const [ordering, setOrdering] = useState(false)
    const Router = useRouter()

    const orderSubmit = async () => {
        try {
            setOrdering(true)
            let data = {
                orderId: order,
                isDelivery,
            }
            let res = await fetch(`/api/edit-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            let json = await res.json()
            if (!res.ok) throw Error(json.message)
                setOrdering(false)
            Router.push({
                pathname: "/order",
                query: { orderId: 154 },
            })
        } catch (err) {
            throw Error(err.message)
        }
    }

    if (cartItems) {
        return (
            <div className={styles.container}>
                {cartItems.map((cartItem) => (
                    <div key={cartItem.lineItemId} className='py-2'>
                        <CartItem
                            id={cartItem.LineItemId}
                            quantity={cartItem.quantity}
                            menuItem={cartItem.menuItem}
                            name={cartItem.name}
                            price={cartItem.price}
                        />
                    </div>
                ))}
                <div className={styles.toggle}>
                    <ToggleSwitch
                        left='Delivery'
                        right='Pickup'
                        onToggle={() => setIsDelivery(!isDelivery)}
                    />
                </div>
                <Button disabled={ordering} onClick={() => orderSubmit()}>
                    {ordering ? "Ordering ..." : "Order"}
                </Button>
            </div>
        )
    } else {
        return null
    }
}

export default Cart
