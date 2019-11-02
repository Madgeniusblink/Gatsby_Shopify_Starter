import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProductListing from "../components/ProductsListing/ProductsListing"
import Hero from "../components/Sections/Hero"
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <ProductListing />
  </Layout>
)

export default IndexPage
