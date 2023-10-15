import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import Image from 'next/image'
import heart from '../public/static/images/heart.png'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="wechat" href={siteMetadata.wechat} size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="flex justify-center text-gray-500 dark:text-gray-400 text-sm mb-2">
          Crafted with
          <Image className="mx-2 animate-heartbeat" width={22} src={heart} alt="heart" /> by Inwind
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">

        </div>
      </div>
    </footer>
  )
}
