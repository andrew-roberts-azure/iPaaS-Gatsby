/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/blog/)) {
    page.matchPath = '/blog/*'
    createPage(page)
  }

  if (page.path.match(/^\/press/)) {
    page.matchPath = '/press/*'
    createPage(page)
  }

  if (page.path.match(/^\/persona/)) {
    page.matchPath = '/persona/*'
    createPage(page)
  }
}
