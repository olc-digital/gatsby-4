require("dotenv").config()

module.exports = {
  siteMetadata: {
    siteUrl: process.env.DOMAIN,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-typescript`,
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "~": "src",
        },
        extensions: ["tsx", "ts", "jsx", "scss", "svg", "jpg", "png"],
      },
    },
    {
      resolve: "gatsby-plugin-sass",
      options: {
        additionalData: `@import "${__dirname}/src/styles/includes/_index";`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-postcss",
      options: {
        postCssPlugins: [require("postcss-custom-media")()],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assets/images`,
      },
    },
    "gatsby-plugin-svgr",
    {
      resolve: `gatsby-transformer-remark`,
    },
    // {
    //   resolve: 'gatsby-plugin-google-tagmanager',
    //   options: {
    //     id: process.env.GTM_ID,
    //     includeInDevelopment: true,
    //   },
    // },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.DOMAIN,
        sitemap: `${process.env.DOMAIN}/sitemap.xml`,
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.API_TOKEN,
        environment: `main`,
        pageSize: 15,
      },
    },
  ],
}
