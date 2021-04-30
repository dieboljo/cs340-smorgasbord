import useSWR from "swr"

function fetcher(url: string) {
    return window.fetch(url).then((res) => res.json())
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

function useRestaurants() {
    const { data, error } = useSWR(`/api/get-restaurants`, fetcher)

    return {
        restaurants: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useRestaurantsSample() {
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

function useLocations() {
    const { data, error } = useSWR(`/api/get-restaurants`, fetcher)

    return {
        restaurants: data,
        isLoading: !error && !data,
        isError: error,
    }
}

function useLocationsSample() {
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

function useMenuItemsSample() {
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

export {
    useEntries,
    useEntry,
    useRestaurantsSample as useRestaurants,
    useLocationsSample as useLocations,
    useBrandSample as useBrand,
    useMenuItemsSample as useMenuItems,
}
