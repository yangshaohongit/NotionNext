/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * 站点图标
 * @returns
 */
export const Logo = props => {
  const { white, NOTION_CONFIG } = props
  const router = useRouter()
  const logoWhite = siteConfig('STARTER_LOGO_WHITE')
  const logoNormal = siteConfig('STARTER_LOGO')
  const { isDarkMode } = useGlobal()
  const [logo, setLogo] = useState(logoNormal)
  const [logoTextColor, setLogoTextColor] = useState('text-gray-900')

  useEffect(() => {
    // 根据深色模式切换logo
    if (isDarkMode) {
      setLogo(logoWhite)
      setLogoTextColor('text-white')
    } else {
      setLogo(logoNormal)
      setLogoTextColor('text-gray-900')
    }
  }, [isDarkMode])

  return (
    <div className='w-60 max-w-full px-4'>
      <div className='navbar-logo flex items-center w-full py-5 cursor-pointer'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logo && (
          <LazyImage
            priority
            onClick={() => {
              router.push('/')
            }}
            src={logo}
            alt='logo'
            className='header-logo mr-1 h-8'
          />
        )}
        {/* logo文字 */}
        <span
          onClick={() => {
            router.push('/')
          }}
          className={`${logoTextColor} logo dark:text-white py-1.5 header-logo-text whitespace-nowrap text-xl font-semibold transition-colors`}>
          {siteConfig('TITLE')}
        </span>
      </div>
    </div>
  )
}
