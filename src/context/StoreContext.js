import React, { createContext, useState, useEffect } from 'react'
import Client from 'shopify-buy'


// check if its a browser
const isBrowser = typeof window !== 'undefined'

export const client = Client.buildClient({
    domain: process.env.GATSBY_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN
})


const defaultValues = {
    isCartOpen: false,
    toggleCartOpen: () => {},
    cart: [],
    addProductToCart: () => { },
    removeProductFromCart: () => {},
    CheckCoupon: () => {},
    removeCoupon: () => {},
    client,
    checkout: {
        lineItems: [],
    }
}

export const StoreContext = createContext(defaultValues)

export const StoreProvider = ({children}) => {
    // State management
    const [checkout, setCheckout] = useState(defaultValues.checkout)
    const [isCartOpen, setCartOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)
    
    const toggleCartOpen = () => {
        setCartOpen(!isCartOpen)
    }

    // React Hook useEffect takes in two parameter (function, paramater that trigger this to run)
    useEffect(() => {
        initializeCheckout()
    }, [])

    const setNewId = async () => {
        try {
            const newCheckout = await client.checkout.create()
            if (isBrowser) {
                // sets the checkout_id value in local storage
                localStorage.setItem('checkout_id', newCheckout.id)
            }
            return newCheckout
        } catch (e) {
            console.error(e)
        }
    }

    const initializeCheckout = async () => {
        try {
            // localStorage checkout process

            // check if id exists (checkoutId)
            const currentCheckoutId = isBrowser ? localStorage.getItem('checkout_id') : null

            let newCheckout = null
            if (currentCheckoutId) {
                // if id exists. fetch checkout from shopify
                newCheckout = await client.checkout.fetch(currentCheckoutId)
                if (newCheckout.completedAt) {
                    newCheckout = await setNewId()
                }
            } else {
                // if id does not. create new checkout
                newCheckout = await setNewId()
            }
            // set Checkout to State
            setCheckout(newCheckout)

        } catch (e) {
            console.log(e)
        }
    }
    // the code above this happen automatically when a user logs into the page using gatsby-browser API
    // addProductToCart awaits the visitor action to click add to cart.
    const addProductToCart = async (variantId) => {
        try {
            setLoading(true)
            // the product Item and quantity
            const lineItems = [
                {
                    variantId,
                    quantity: 1,
                }
            ]

            // adds Item to checkout card which takes the Id from newCheckout
            const newCheckout = await client.checkout.addLineItems(
                checkout.id, 
                lineItems
            )
            console.log(client)
            setCheckout(newCheckout)
            setLoading(false)

        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const removeProductFromCart = async (lineItemId) => {
        try {
            setLoading(true)
            // removes Item to checkout card which takes the Id from newCheckout
            const newCheckout = await client.checkout.removeLineItems(
                checkout.id,
                [lineItemId]
            )
            
            setCheckout(newCheckout)
            setLoading(false)

        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const CheckCoupon =  async (coupon) => {
        try {
            setLoading(true)
            const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)
            setCheckout(newCheckout)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }
    const removeCoupon =  async (coupon) => {
        try {
            setLoading(true)
            const newCheckout = await client.checkout.removeDiscount(checkout.id, coupon)
            setCheckout(newCheckout)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)

        }
    }

    return (
        <StoreContext.Provider value={{
            ...defaultValues,
            checkout,
            addProductToCart,
            removeProductFromCart,
            toggleCartOpen,
            isCartOpen,
            CheckCoupon,
            removeCoupon,
            isLoading,
        }} >
            {children}
        </StoreContext.Provider>
    )
}





