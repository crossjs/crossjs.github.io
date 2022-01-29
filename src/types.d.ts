export interface Post {
  frontmatter: {
    title?: string
    date?: string
    description?: string
  }
  fields: {
    slug: string
  }
  excerpt: string
}

export interface SiteMetadata {
  title: string
  author: {
    name: string
    summary: string
  }
  social: {
    github: string
  }
}
