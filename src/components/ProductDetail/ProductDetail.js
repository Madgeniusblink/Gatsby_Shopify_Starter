import React, { useState, useContext } from 'react'
import Img from "gatsby-image"
import { StoreContext } from '../../context/StoreContext'

const ProductDetail = ({ product }) => {
    // Manage States
    const [selectedvariant, setVariant] = useState(product.variants[0])
    // brings client from the context folder
    const { client } = useContext(StoreContext)

    // Add to card
    const addToCart = async (variantId) => {
        const newCheckout = await client.checkout.create()
    
        const lineItems = [
            {
                variantId: variantId.replace("Shopify__ProductVariant__", ""),
                quantity: 1,
            }
        ]
    
        const addItems = await client.checkout.addLineItems(
            newCheckout.id,
            lineItems
        )

        window.open(addItems.webUrl, "_blank")
    }
    //  Displays the product tags
    const listTag = product.tags.map((tag,index) => {
        return (
            <li key={index}>{tag}</li>
        )
    })

    // Mapping every variant for each options values(colors, sizes, etc)
    const productVariants = product.variants.map((variant) => (
            <option key={variant.id} value={variant.sku}  >{variant.title}</option>
    ))

    return (
        <div className="md:flex">
            <div>
                <Img key={product.id} fixed={product.images[0].localFile.childImageSharp.fixed}/>
            </div>
            <div className="md:ml-6">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <h5>${selectedvariant.price}</h5>
                <h3>tags</h3>
                <ul>
                    {listTag}
                </ul>
                <select 
                    onChange={(e) => {
                        const selected = product.variants.filter((variant) => variant.sku === e.target.value)
                        return setVariant(selected[0])
                    }} 
                    value={selectedvariant.sku}
                >
                    {productVariants}
                </select> <br/>
                <button
                    className="bg-blue-500 text-white font-bold rounded px-4 py-2 border-b-4 border-blue-700" 
                    onClick={() => addToCart(selectedvariant.id)}
                >
                    Buy Now
                </button>
            </div>
            
        </div>
    )
}

export default ProductDetail
