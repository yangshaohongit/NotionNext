/* eslint-disable no-unreachable */
import DashboardButton from '@/components/ui/dashboard/DashboardButton'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import throttle from 'lodash.throttle'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { DarkModeButton } from './DarkModeButton'
import { Logo } from './Logo'
import { MenuList } from './MenuList'

/**
 * 顶部导航栏
 */
export const Header = props => {
  const router = useRouter()
  const { isDarkMode } = useGlobal()
  const [buttonTextColor, setColor] = useState('')

  const enableClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

  useEffect(() => {
    if (isDarkMode) {
      setColor('text-white')
    } else {
      setColor('text-gray-900')
    }
    // ======= Sticky
    window.addEventListener('scroll', navBarScollListener)
    return () => {
      window.removeEventListener('scroll', navBarScollListener)
    }
  }, [isDarkMode])

  // 滚动监听
  const throttleMs = 200
  const navBarScollListener = useCallback(
    throttle(() => {
      // eslint-disable-next-line camelcase
      const ud_header = document.querySelector('.ud-header')
      const scrollY = window.scrollY
      // 控制台输出当前滚动位置和 sticky 值
      if (scrollY > 0) {
        ud_header?.classList?.add('sticky')
      } else {
        ud_header?.classList?.remove('sticky')
      }
    }, throttleMs)
  )

  return (
    <>
      {/* <!-- ====== Navbar Section Start --> */}
      <div className='ud-header absolute left-0 top-0 z-40 flex w-full items-center bg-white/80 dark:bg-dark/80 backdrop-blur-md'>
        <div className='container mx-auto'>
          <div className='relative -mx-4 flex items-center justify-between'>
            {/* Logo */}
            <Logo {...props} />

            <div className='flex w-full items-center justify-between px-4'>
              {/* 中间菜单 */}
              <MenuList {...props} />

              {/* 右侧功能 */}
              <div className='flex items-center gap-4 justify-end pr-16 lg:pr-0'>
                {/* 深色模式切换 */}
                <DarkModeButton />
                {/* 注册登录功能 */}
                {enableClerk && (
                  <>
                    <SignedOut>
                      <div className='hidden sm:flex gap-4'>
                        <SmartLink
                          href={siteConfig('STARTER_NAV_BUTTON_1_URL', '')}
                          className={`loginBtn ${buttonTextColor} p-2 text-base font-medium hover:opacity-70`}>
                          {siteConfig('STARTER_NAV_BUTTON_1_TEXT')}
                        </SmartLink>
                        <SmartLink
                          href={siteConfig('STARTER_NAV_BUTTON_2_URL', '')}
                          className={`signUpBtn rounded-full px-5 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 duration-300 ease-in-out hover:opacity-90 transition-all`}>
                          {siteConfig('STARTER_NAV_BUTTON_2_TEXT')}
                        </SmartLink>
                      </div>
                    </SignedOut>
                    <SignedIn>
                      <UserButton />
                      <DashboardButton className={'hidden md:block'} />
                    </SignedIn>
                  </>
                )}
                {!enableClerk && (
                  <div className='hidden sm:flex gap-4'>
                    <SmartLink
                      href={siteConfig('STARTER_NAV_BUTTON_1_URL', '')}
                      className={`loginBtn ${buttonTextColor} p-2 text-base font-medium hover:opacity-70`}>
                      {siteConfig('STARTER_NAV_BUTTON_1_TEXT')}
                    </SmartLink>
                    <SmartLink
                      href={siteConfig('STARTER_NAV_BUTTON_2_URL', '')}
                      className={`signUpBtn ${buttonTextColor} p-2 rounded-md bg-white bg-opacity-20 py-2 text-base font-medium duration-300 ease-in-out hover:bg-opacity-100 hover:text-dark`}>
                      {siteConfig('STARTER_NAV_BUTTON_2_TEXT')}
                    </SmartLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ====== Navbar Section End --> */}
    </>
  )
}
