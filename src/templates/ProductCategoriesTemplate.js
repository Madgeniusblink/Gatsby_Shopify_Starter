import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ProductsListingItem from '../components/ProductsListing/ProductsListingItem'
import Img from "gatsby-image"

const ProductCategoriesTemplate = ({ data }) => {
  const { shopifyCollection } = data

  return (
    <Layout>
      <div>
        <div>
          <Img fluid={shopifyCollection.image.localFile.childImageSharp.fluid}/>
        </div>
        <h2 className="title">{shopifyCollection.title}</h2>

          <div className="columns is-multiline">
            { 
              shopifyCollection.products.map((product) => (
                  <ProductsListingItem key={product.id} product={product} />
              )) 
            }
          </div>
      </div>
    </Layout>
  )
}

export default ProductCategoriesTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      handle
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 800 maxHeight: 267) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      products {
        title
        handle
        id
        description
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
`