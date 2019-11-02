import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"
import AddToCart from "../Cart/AddToCart"

const ProductsListingItem = ({ product }) => {
  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product
  return (
    <article className="column is-one-quarter content">
      <Link
        to={`/product/${product.handle}`}
        style={{ display: "block", marginBottom: "2rem" }}
      >
        <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        <h3 className="title is-3">{product.title}</h3>
        <p className="subtitle is-4">${firstVariant.price}</p>
      </Link>
      <AddToCart variantId={firstVariant.shopifyId} />
    </article>
  )
}


export default ProductsListingItem


// old Product.js file

// import React from 'react'
// import Img from "gatsby-image"
// import { Link } from "gatsby"

// const Product = ({product}) => {
//     return (
//         <Link to={`/products/${product.handle}`}>
//             <article>
//                 <h3>{product.title}</h3>
//                 <Img key={product.id} fixed={product.images[0].localFile.childImageSharp.fixed}/>
//                 <h3>${product.priceRange.maxVariantPrice.amount}</h3>
//             </article>
//         </Link>
//     )
// }

// export default Product
