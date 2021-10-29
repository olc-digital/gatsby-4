const path = require("path")

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions;
//   const typeDefs = ``;
//   createTypes(typeDefs);
// };

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    query PageQuery {
      allDatoCmsPage {
        nodes {
          heading
          content {
            ... on DatoCmsApartmentsList {
              internal {
                type
              }
            }
            ... on DatoCmsGallery {
              internal {
                type
              }
              aboveText {
                value
              }
              actionUrl
              description {
                value
              }
              images {
                fluid {
                  height
                  src
                  width
                  aspectRatio
                  base64
                }
              }
            }
            ... on DatoCmsMap {
              heading
              subheading {
                value
              }
              internal {
                type
              }
            }
            ... on DatoCmsNewsletterSignup {
              internal {
                type
              }
              heading
              subheading {
                value
              }
            }
            ... on DatoCmsInfo {
              internal {
                type
              }
              infoPieces {
                heading
                description {
                  value
                }
                image {
                  fluid {
                    src
                    width
                    height
                    aspectRatio
                    base64
                  }
                }
              }
            }
            ... on DatoCmsQuoteBlock {
              internal {
                type
              }
              heading
              quotes {
                author
                quote {
                  value
                }
              }
            }
            ... on DatoCmsText {
              internal {
                type
              }
              text {
                value
              }
            }
          }
          subheading
          image {
            fluid {
              src
              width
              height
              aspectRatio
              base64
            }
          }
          video {
            url
            provider
            providerUid
          }
          slug
          seo {
            description
            image {
              fluid {
                src
                width
                height
                aspectRatio
                base64
              }
            }
            title
          }
        }
      }
    }
  `)

  const componentPath = path.resolve(`./src/templates/page/index.tsx`)

  result.data.allDatoCmsPage.nodes.forEach(page => {
    createPage({
      path: `${page.slug || "/"}`,
      component: componentPath,
      context: page,
    })
  })
}
