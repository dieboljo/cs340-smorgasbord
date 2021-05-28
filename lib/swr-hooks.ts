import { useEffect, useState } from "react"
import useSWR from "swr"

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
}

const useBrands = (name='') => {
    const { data, error } = useSWR(`/api/get-restaurant-brands?name=${name}`, fetcher)

    return {
        brands: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useCustomers(email='') {
    const { data, error } = useSWR(`/api/get-customers?email=${email}`, fetcher)

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

function useLocations(brand='') {
    const { data, error } = useSWR(`/api/get-restaurant-locations?brand=${brand}`, fetcher)

    return {
        locations: data,
        isLoading: !error && !data,
        isError: error,
    }
}

const useMenuItems = (location='') => {
    const { data, error } = useSWR(`/api/get-menu-items?location=${location}`, fetcher)

    return {
        menuItems: data,
        isLoading: !error && !data,
        isError: error,
    }
}

const useLineItems = (orderId='') => {
    const { data, error } = useSWR(`/api/get-line-items?orderId=${orderId}`, fetcher)

    return {
        lineItems: data,
        isLoading: !error && !data,
        isError: error,
    }
}

const useOrder = ({ orderId='', customerId='', locationId='' } = {}) => {
    const [ id, setId ] = useState(orderId)
    useEffect(() => {
        const getOpenOrderId = async () => {
            try {
                let data = {
                    location: locationId,
                    customer: customerId,
                }
                let res = await fetch(`/api/get-open-order-id`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
                if (json && json[0]) {
                    return json[0].orderId;
                } else {
                    return ''
                }
            } catch (err) {
                throw Error(err.message)
            }
        }
        const createOrder = async () => {
            try {
                let data = {
                    customer: customerId,
                    location: locationId,
                    courier: null,
                    status: "Working",
                }
                let res = await fetch(`/api/create-order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                let json = await res.json()
                if (!res.ok) throw Error(json.message)
            } catch (err) {
                throw Error(err.message)
            }
        }
        const getOrderId = async () => {
            let openId = await getOpenOrderId()
            if (!openId) {
                await createOrder()
                openId = await getOpenOrderId()
            }
            setId(openId)
        }
        if (!id && customerId && locationId) {
            getOrderId()
        }
    }, [customerId, locationId])

    const { data, error } = useSWR(`/api/get-order?orderId=${id}`, fetcher)

    return {
        order: data, 
        isLoading: !error && !data,
        isError: error,
    }
}

const useOrders = (customerId='') => {
    const { data, error } = useSWR(`/api/get-orders?customerId=${customerId}`, fetcher)

    return {
        orders: data,
        isLoading: !error && !data,
        isError: error,
    }
}

export {
    useEntries,
    useEntry,
    useCustomers,
    useLocations,
    useBrands,
    useMenuItems,
    useLineItems,
    useOrder,
    useOrders,
}
