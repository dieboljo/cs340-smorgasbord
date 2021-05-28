import cn from "clsx"

import RestaurantForm from "@/components/restaurant-form"
import Restaurant from './restaurant';
import styles from "./restaurants.module.scss"

export const Restaurants = ({ restaurants }) => {
    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <p className={styles.cell}>ID</p>
                <p className={styles.cell}>Name</p>
                <p className={styles.cell}>Hours</p>
                <p className={styles.cell}>Address</p>
                <p className={styles.cell}>Actions</p>
            </div>
            <RestaurantForm />
            {restaurants && restaurants.map((restaurant) => (
                <div key={restaurant.locationId} className="py-2">
                    <Restaurant 
                        id={restaurant.locationId} 
                        brandId={restaurant.brandId}
                        name={restaurant.name}
                        logo={restaurant.logo}
                        openTime={restaurant.openTime} 
                        closeTime={restaurant.closeTime} 
                        address={restaurant.address} 
                    />
                </div>
            ))}
        </div>
    )
}

export default Restaurants
