/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import profilePic from "@/images/profile-pic.jpg"
import { SiteMetadata } from "@/types"

const Bio = () => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: SiteMetadata
    }
  }>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            github
          }
        }
      }
    }
  `)

  const {
    author: { name, summary },
    social: { github },
  } = data.site.siteMetadata

  return (
    <div className="flex mb-14">
      <img
        className="mr-3 w-14 h-14 rounded-full"
        src={profilePic}
        alt="Profile picture"
      />
      <p className="mb-7">
        Personal blog by
        <a
          className="mx-1 font-bold underline hover:no-underline"
          href={`https://github.com/${github}`}
        >
          {name}
        </a>
        .
        <br />
        {summary ?? ""}
      </p>
    </div>
  )
}

export default Bio
