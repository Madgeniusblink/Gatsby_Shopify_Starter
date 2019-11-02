import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'


const Hero = () => {
    const { shopifyProduct: product } = useStaticQuery(graphql`
        query HeroQuery {
            shopifyProduct(
                vendor: {eq: "Billboard"}
            ) {
                title
                handle
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
                            fluid(maxWidth: 800, maxHeight: 400){
                                ...GatsbyImageSharpFluid_withWebp_tracedSVG
                            }
                        }
                    }
                }
            }
        }
  `)
    const {
        images: [firstImage],
        variants: [firstVariant],
    } = product
    return (
        <div>
            Hero
        </div>
    )
}

export default Hero
