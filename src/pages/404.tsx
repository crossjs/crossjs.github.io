import * as React from "react"
import { PageProps, graphql } from "gatsby"

import Layout from "@/components/layout"
import Seo from "@/components/seo"
import { SiteMetadata } from "@/types"

interface DataProps {
  site: {
    siteMetadata: SiteMetadata
  }
}

const NotFoundPage = ({ data, location }: PageProps<DataProps>) => {
  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
