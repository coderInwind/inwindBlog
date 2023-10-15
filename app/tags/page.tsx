import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const posts = allCoreContent(sortPosts(allBlogs))
  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}

// import Link from '@/components/Link'
// import Tag from '@/components/Tag'
// import { slug } from 'github-slugger'
// import tagData from 'app/tag-data.json'
// import { genPageMetadata } from 'app/seo'
// import { allBlogs } from 'contentlayer/generated'
// import { useState } from 'react'

// interface Tags {
//   count: number
//   title: string
// }

// export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

// export default async function Page() {
//   // const tagCounts = tagData as Record<string, number>
//   // const tagKeys = Object.keys(tagCounts)
//   // const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
//   // const [tags, setTags] = useState<string[]>([])
//   const tags: Tags[] = []
//   // 计算所有的标签
//   allBlogs.forEach(item => {
//     if (!item.tags.length) return
//     item.tags.forEach(iten => {
//       const tagIndex = tags.findIndex(iteo => iteo.title === iten)
//       if (tagIndex !== -1) {
//         tags[tagIndex].count += 1
//       } else {
//         tags.push({ title: iten, count: 1 })
//       }
//     })
//   })

//   return (
//     <>
//       <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
//         <div className="space-x-2 pb-8 pt-6 md:space-y-5">
//           <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
//             Tags
//           </h1>
//         </div>
//         <div className="flex max-w-lg flex-wrap">
//           {tags.length === 0 && 'No tags found.'}
//           {tags.map((t) => {
//             return (
//               <div key={t.title} className="mb-2 mr-5 mt-2">
//                 <Tag text={t.title} />
//                 <Link
//                   href={`/tags/${slug(t.title)}`}
//                   className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
//                   aria-label={`View posts tagged ${t.title}`}
//                 >
//                   {` (${t.count})`}
//                 </Link>
//               </div>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }
