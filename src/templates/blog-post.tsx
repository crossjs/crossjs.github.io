import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "@/components/bio"
import Layout from "@/components/layout"
import Seo from "@/components/seo"
import SiteTitle from "@/components/site-title"
import { SiteMetadata } from "@/types"

interface DataProps {
  site: {
    siteMetadata: SiteMetadata
  }
  markdownRemark: {
    id: string
    excerpt: string
    html: string
    frontmatter: {
      title: string
      date: string
      description?: string
    }
  }
  previous?: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
  next?: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
    }
  }
}

const BlogPostTemplate: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark
  const { previous, next } = data

  return (
    <Layout location={location} title={data.site.siteMetadata.title}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <main>
        <article>
          <header>
            <h1 className="mt-14 mb-7 h-8 text-4xl font-black leading-8">
              {post.frontmatter.title}
            </h1>
            <p className="mb-7 -mt-5 text-sm leading-7">
              {post.frontmatter.date}
            </p>
          </header>
          <section
            className="prose prose-slate prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
      </main>
      <aside>
        <section className="mt-12 mb-4">
          <SiteTitle location={location} title={data.site.siteMetadata.title} />
        </section>
        <Bio />
        {(previous || next) && (
          <nav className="mt-4">
            <ul className="flex flex-wrap justify-between list-none p-0">
              <li>
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li>
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </aside>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`