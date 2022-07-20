import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "@/components/bio"
import Layout from "@/components/layout"
import Seo from "@/components/seo"
import { Post, SiteMetadata } from "@/types"

interface DataProps {
  site: {
    siteMetadata: SiteMetadata
  }
  allMdx: {
    nodes: Post[]
  }
}

const BlogIndex = ({ data, location }: PageProps<DataProps>) => {
  const { nodes: posts } = data.allMdx

  if (posts.length === 0) {
    return (
      <Layout location={location} title={data.site.siteMetadata.title}>
        <Seo title={data.site.siteMetadata.title} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <Seo />
      <aside>
        <Bio />
      </aside>
      <main>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <article key={post.fields.slug}>
              <header>
                <h3 className="mt-12 mb-2 text-3xl font-black">
                  <Link to={post.fields.slug}>
                    <span>{title}</span>
                  </Link>
                </h3>
                <small className="text-xs">{post.frontmatter.date}</small>
              </header>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
              />
            </article>
          )
        })}
      </main>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
      nodes {
        fields {
          slug
        }
        excerpt
        frontmatter {
          title
          description
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
