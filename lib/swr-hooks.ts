import useSWR from "swr"

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

function useBrands(filter) {
    const { data, error } = useSWR(`/api/get-brands?filter=${filter}`, fetcher)

    return {
        brands: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useBrandsSample(filter) {
    const data = [
        {
            brandId: 34,
            name: "Taco Town",
            logo: "taco-town.png",
        },
    ]
    const error = false

    return {
        brands: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useCustomers(filter) {
    const { data, error } = useSWR(`/api/get-customers?filter=${filter}`, fetcher)

    return {
        brands: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useCustomersSample(filter) {
    const data = [
        {
            customerId: 443,
            name: "Patty O'Malley",
            email: "patty@oshaunesseys.com",
        },
    ]
    const error = false

    return {
        customers: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useEntries() {
    const { data, error } = useSWR(`/api/get-entries`, fetcher)

    return {
        entries: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useEntry(id: string) {
    return useSWR(`/api/get-entry?id=${id}`, fetcher)
}

function useRestaurants(filter) {
    const { data, error } = useSWR(`/api/get-restaurants?filter=${filter}`, fetcher)

    return {
        restaurants: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useRestaurantsSample(filter) {
    const data = [
        {
            locationId: 34,
            name: "Taco Town",
            logo: "taco-town.png",
            openTime: 9.0,
            closeTime: 21.0,
            address: "1423 Hillverhill Ln",
        },
    ]
    const error = false

    return {
        restaurants: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useLocations({ brandId='', filter='' } = {}) {
    const { data, error } = useSWR(`/api/get-restaurant-locations`, fetcher)

    return {
        locations: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useLocationsSample({ brandId='', filter='' } = {}) {
    const data = [
        {
            locationId: 34,
            brandId: 4444,
            name: "Taco Town",
            logo: "taco-town.png",
            openTime: 9.0,
            closeTime: 21.0,
            address: "1423 Hillverhill Ln",
        },
    ]
    const error = false

    return {
        locations: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useBrandSample({ brandId=null, name='', locationId=null } = {}) {
    const data = {
        brandId: 4444,
        name: 'Taco Town',
        logo: 'taco-town.png',
    }
    const error = false

    return {
        brand: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useMenuItemsSample(locationId) {
    const data = [
        {
            menuItemId: 43,
            name: "Beef Taco",
            description: "A taco filled with beef",
            price: 14.20,
            location: 34
        },
    ]
    const error = false

    return {
        menuItems: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useLineItemsSample(orderId) {
    const data = [
        {
            lineItemId: 259,
            quantity: 4,
            menuItem: 233,
            name: "Chicken quesadilla",
            price: 2.35,
        },
        {
            lineItemId: 245,
            quantity: 2,
            menuItem: 155,
            name: "Tostada",
            price: 1.99,
        },
    ]
    const error = false
    return {
        lineItems: data,
        isLoading: !error && !data,
        isError: error,
    }
}

const  useOrderSample = ({ orderId='', customerId='', locationId='' } = {}) => {
    //const query = orderId 
    //    ? `orderId=${orderId}` 
    //    : `customerId=${customerId}&locationId=${locationId}`;
    //const { data, error} = useSWR(`/api/get-order?${query}`, fetcher)

    const data = {
        orderId: 155,
        customer: "Ted Stevenson",
        location: "Taco Town",
        courier: "Craig",
        status: "On the Way",
    }
    const error = false
    return {
        order: data,
        isLoading: !error && !data,
        isError: error,
    }
}

const  useOrdersSample = (filter) => {
    //const query = orderId 
    //    ? `orderId=${orderId}` 
    //    : `customerId=${customerId}&locationId=${locationId}`;
    //const { data, error} = useSWR(`/api/get-order?${query}`, fetcher)

    const data = [
        {
            orderId: 155,
            customer: "Ted Stevenson",
            location: "Taco Town",
            courier: "Craig",
            status: "On the Way",
        }
    ]
    const error = false
    return {
        orders: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export {
    useEntries,
    useEntry,
    useCustomersSample as useCustomers,
    useRestaurantsSample as useRestaurants,
    useLocationsSample as useLocations,
    useBrandSample as useBrand,
    useBrandsSample as useBrands,
    useMenuItemsSample as useMenuItems,
    useLineItemsSample as useLineItems,
    useOrderSample as useOrder,
    useOrdersSample as useOrders,
}
