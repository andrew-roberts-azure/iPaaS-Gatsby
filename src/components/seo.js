import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, url, lang, meta, keywords, title, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description
        const headerTitle = title
        // const headerTitle = title + ' | ' + data.site.siteMetadata.title
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                name: `image`,
                content: image,
              },
              {
                property: `og:title`,
                content: headerTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:url`,
                content: url,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                property: `og:image`,
                content: image,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
              {
                'http-equiv': 'Content-Security-Policy',
                content:
                  "default-src 'self' http://ipaascms.dd:8083/ http://ipaas-cms.lndo.site/  https://cms.ipaas.dev/ https://cms.ipaas.com/ data: blob: http://* https://* wss://* ws://*; style-src  'self' http://* https://* 'unsafe-inline'; script-src 'self' http://* https://* 'unsafe-inline' 'unsafe-eval'",
              },
            ]
              // .concat(
              //   keywords.length > 0
              //     ? {
              //         name: `keywords`,
              //         content: keywords.join(`, `),
              //       }
              //     : []
              // )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  // keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  // keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
