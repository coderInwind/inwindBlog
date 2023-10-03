const { Octokit } = require('@octokit/core')
const pinyin = require('pinyin')
const fs = require('fs')
const path = require('path')

const { TOKEN } = process.env

const octokit = new Octokit({
  auth: TOKEN,
  // auth: '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',
})

const generateMdx = (issue) => {
  const { title, labels, created_at, body } = issue
  return `---
  title: ${title}
  date: ${created_at}
  summary:
  tags: ${JSON.stringify(labels.map((item) => item.name))}
---

${body.replace(/<br \/>/g, '\n')}
`
}

const blogOutPutPath = '../../data/blog'

function main() {
  octokit
    .request('GET /repos/{owner}/{repo}/issues', {
      owner: 'coderLgee',
      repo: 'inwindBlog',
    })
    .then((res) => {
      const libPath = path.resolve(__dirname, blogOutPutPath)

      console.log(res.data);

      for (item of res.data) {
        const content = generateMdx(item)
        const tempFileName = item.title

        const fileName = pinyin(tempFileName, {
          style: 0,
        }).join('')

        fs.writeFileSync(`${libPath}/${fileName}.mdx`, content)
      }
    })
}

module.exports = main
