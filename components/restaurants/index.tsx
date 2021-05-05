import cn from "clsx"

import Restaurant from './restaurant';
import styles from "./restaurants.module.scss"

export const Restaurants = ({ restaurants, isCustomer }) => {
    const brandColumns = (
        <div className={cn(styles.row, styles.brandRow)}>
            <p className={styles.cell}>Name</p>
            <p className={styles.cell}>Hours</p>
            <p className={styles.cell}>Address</p>
            <p className={styles.cell}>Actions</p>
        </div>
    )
    const customerColumns = (
        <div className={cn(styles.row, styles.customerRow)}>
            <p className={styles.cell}>Name</p>
            <p className={styles.cell}>Hours</p>
            <p className={styles.cell}>Address</p>
        </div>
    )

  if (restaurants) {
    return (
      <div className={styles.container}>
        {isCustomer
            ? customerColumns
            : brandColumns
        }
        {restaurants.map((restaurant) => (
          <div key={restaurant.locationId} className="py-2">
              <Restaurant 
                  id={restaurant.locationId} 
                  name={restaurant.name}
                  logo={restaurant.logo}
                  openTime={restaurant.openTime} 
                  closeTime={restaurant.closeTime} 
                  address={restaurant.address} 
                  isCustomer={isCustomer}
              />
          </div>
        ))}
      </div>
    )
  } else {
    return null
  }
}

export default Restaurants
