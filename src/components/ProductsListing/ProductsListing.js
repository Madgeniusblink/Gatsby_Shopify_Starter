import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import ProductsListingItem from "./ProductsListingItem"

const PRODUCTS_LISTING_QUERY = graphql`
    query ProductsListingQuery {
        allShopifyProduct {
            edges {
                node {
                    id
                    description
                    handle
                    title
                    variants {
                        shopifyId
                        title
                        price
                        availableForSale
                        sku
                    }
                    images {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 396, maxHeight: 142){
                                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

const ProductListing = () => {
    const { allShopifyProduct } = useStaticQuery(PRODUCTS_LISTING_QUERY)
    return (
        <div>
            <h2 className="title">Evee EyeWear Products</h2>
            <div className="columns is-multiline">
                { 
                    allShopifyProduct.edges.map(({ node: product}) => (
                        <ProductsListingItem key={product.id} product={product} />
                    )) 
                }
            </div>
        </div>
    )
}

export default ProductListing
