import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

interface ProductData {
    createdAt: string,
    description: string,
    photos: Array<string>,
    price: number,
    title: string,
    _v: number,
    _id: string
}

interface BasketContextData {
    items: ProductData[],
    setItems: React.Dispatch<React.SetStateAction<ProductData[]>>,
    addToBasket: (data: ProductData, findBasketItem: ProductData | undefined) => void,
    removeFromBasket: (itemId: string) => void
    emptyBasket: () => void
}

const initialValues: BasketContextData = {
    items: [],
    setItems: (): void => {},
    addToBasket: (): void => {},
    removeFromBasket: (): void => {},
    emptyBasket: (): void => {}
}

const BasketContext: React.Context<BasketContextData> = createContext<BasketContextData>(initialValues)

export const useBasket = (): BasketContextData => useContext(BasketContext)

interface BasketProviderProps {
    children: ReactNode
}

const defaultBasket: ProductData[] = JSON.parse(localStorage.getItem("basket") || "[]");
export const BasketProvider: React.FC<BasketProviderProps> = ({children}) => {
    const [items, setItems] = useState<ProductData[]>(defaultBasket)

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items))
    }, [items])
    const addToBasket = (data: ProductData, findBasketItem: ProductData | undefined): void => {
        if (!findBasketItem) {
            return setItems((items: ProductData[]) => [...items, data])
        }

        const filtered: ProductData[] = items
            .filter((item: ProductData): boolean => item._id !== findBasketItem._id)
        setItems(filtered)
    }

    const removeFromBasket = (itemId: string): void => {
        const filtered: ProductData[] = items.filter((item: ProductData): boolean => item._id !== itemId)
        setItems(filtered)
    }

    const emptyBasket = () => setItems([])

    const values: BasketContextData = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
}