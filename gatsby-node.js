const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // Product Pages
    const pages = await graphql(`
        {
            allShopifyProduct {
                edges {
                    node {
                        id
                        handle
                    }
                }
            }
        }
    `)

    pages.data.allShopifyProduct.edges.forEach(edge => {
        createPage({
            path: `/product/${edge.node.handle}`,
            component: path.resolve("./src/templates/ProductPageTemplate.js"),
            context: {
                id: edge.node.id,
                handle: edge.node.handle,
            }
            
        })
    })
    
    // Collection Pages
    const collections = await graphql(`
        {
            allShopifyCollection {
                edges {
                  node {
                    id
                    handle
                    shopifyId
                  }
                }
            }
        }
    `)

    collections.data.allShopifyCollection.edges.forEach(edge => {
        createPage({
            path: `/${edge.node.handle}`,
            component: path.resolve("./src/templates/ProductCategoriesTemplate.js"),
            context: {
                id: edge.node.id,
                handle: edge.node.handle,
            }
            
        })
    })
}