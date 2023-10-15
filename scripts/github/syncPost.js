const { Octokit } = require('@octokit/core')
const pinyin = require('pinyin')
const fs = require('fs')
const path = require('path')
const tags = require('../../app/tag-data.json')

const { TOKEN } = process.env

const octokit = new Octokit({
  auth: TOKEN,
  // auth: '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',
})


let currentTags
const generateMdx = (issue) => {
  const { title, labels, created_at, body } = issue

  // generateTags(labels)

  return `---
  title: ${title}
  date: ${created_at}
  summary:
  tags: ${JSON.stringify(labels.map((item) => item.name))}
---
  
  ${body.replace(/<br \/>/g, '\n')}
  `

}

// // 处理/新增标签
// const  generateTags = (thisTags)=>{
  
// }


// 分组写入
const outPutPath = path.resolve(__dirname, '../../data/blog')

const blockWrite = (item) => {
  // 生成博文
  const content = generateMdx(item)
  const tempFileName = item.title
  const date = new Date()
  const blocksName = date.getFullYear() + '-' + date.getMonth()

  const fileName = pinyin(tempFileName, {
    style: 0,
  }).join('')

  // 访问性测试
  const blocksPath = outPutPath + '/' + blocksName
  try {
    fs.accessSync(blocksPath, fs.constants.R_OK && fs.constants.W_OK)
  } catch (e) {
    // 创建目录
    fs.mkdirSync(blocksPath)
  }

  fs.writeFileSync(`${outPutPath}/${blocksName}/${fileName}.mdx`, content)
}

function main() {
  octokit
    .request('GET /repos/{owner}/{repo}/issues', {
      owner: 'coderLgee',
      repo: 'inwindBlog',
    })
    .then((res) => {
      for (item of res.data) {
        // 按月份进行分组写入

        blockWrite(item)
      }
    })
}

module.exports = main
