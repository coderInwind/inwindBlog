const { Octokit } = require('@octokit/core')
const pinyin = require("pinyin")
const fs = require("fs")
const path = require('path')

const { TOKEN } = process.env

const octokit = new Octokit({
  auth: TOKEN,
  auth: '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',
})

const generateMdx = (issue) => {
  const { title, labels, created_at, body } = issue
  return `---
  title: ${title}
  publishedAt: ${created_at}
  summary:
  tags: ${JSON.stringify(labels.map((item) => item.name))}
---

${body.replace(/<br \/>/g, '\n')}
`
}


const blogOutPutPath = "../../data/blog"

function main (){

  octokit
    .request('GET /repos/{owner}/{repo}/issues', {
      owner: 'coderLgee',
      repo: 'inwindBlog',
    })
    .then((res) => {

      const libPath = path.resolve(__dirname,blogOutPutPath)
  
      for (item of res.data) {
        const content = generateMdx(item)
        const tempFileName = item.title
  
        const fileName = pinyin(tempFileName, {
          style:0
        }).join("")
  
        fs.writeFileSync(`${libPath}/${fileName}.mdx`,content).then(res=>{
          console.log(res);
        })
      }
    })
}

module.exports = main