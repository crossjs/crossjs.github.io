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
  allMarkdownRemark: {
    nodes: Post[]
  }
}

const BlogIndex: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const { nodes: posts } = data.allMarkdownRemark

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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`