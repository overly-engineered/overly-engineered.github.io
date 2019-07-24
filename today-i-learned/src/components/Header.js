import React from "react";
import { StaticQuery, graphql } from "gatsby";
import GitHubButton from "react-github-btn";
import Link from "./link";
import "./styles.css";

import Sidebar from "./sidebar";

const Header = ({ location }) => (
  <StaticQuery
    query={graphql`
      query headerTitleQuery {
        site {
          siteMetadata {
            headerTitle
            headerLinks {
              link
              text
            }
          }
        }
      }
    `}
    render={data => {
      const logoImg = require("./images/logo.png");
      const {
        site: {
          siteMetadata: { headerTitle, logo }
        }
      } = data;
      return (
        <div className={"navBarWrapper"}>
          <nav className={"navbar navbar-default navBarDefault"}>
            <div className={"navbar-header"}>
              <button
                type="button"
                className={"navbar-toggle collapsed navBarToggle"}
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className={"sr-only"}>Toggle navigation</span>
                <span className={"icon-bar"} />
                <span className={"icon-bar"} />
                <span className={"icon-bar"} />
              </button>
              <Link to="/" className={"navbar-brand navBarBrand"}>
                <img className={"img-responsive"} src={logoImg} alt={"logo"} />
                {headerTitle}
              </Link>
            </div>
            <div
              id="navbar"
              className={"navbar-collapse collapse navBarCollapse"}
            >
              <div className={"visible-xs"}>
                <Sidebar location={location} />
                <hr />
              </div>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

export default Header;
