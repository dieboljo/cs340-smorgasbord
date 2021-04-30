import Restaurant from './restaurant';
import styles from "./restaurants.module.scss"

export const Restaurants = ({ restaurants, isCustomer }) => {
  if (restaurants) {
    return (
      <div className={styles.container}>
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
