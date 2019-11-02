import React from 'react'
import {useStaticQuery, graphql, Link } from 'gatsby'



const Nav = () => {
    const { allShopifyCollection } = useStaticQuery(graphql`
        query allShopifyCollections {
            allShopifyCollection {
                edges {
                    node {
                        title
                        handle
                        shopifyId
                    }
                }
            }
        }
    `)
    return (
        <nav>
            {allShopifyCollection.edges.map(edge => {
                return (
                    <Link key={edge.node.shopifyId} style={{color: "white", padding: 40}} className="sub-title is-three" to={`/${edge.node.handle}`}>{edge.node.title}</Link>
                )
            })}
        </nav>
    )
}

export default Nav
