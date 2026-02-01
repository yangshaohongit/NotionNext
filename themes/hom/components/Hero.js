/* eslint-disable @next/next/no-img-element */
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'

/**
 * 英雄大图区块
 */
export const Hero = props => {
  const config = props?.NOTION_CONFIG || CONFIG
  return (
    <>
      {/* <!-- ====== Hero Section Start --> */}
      <div
        id='home'
        className='relative overflow-hidden bg-white dark:bg-gray-900 pt-[140px] md:pt-[150px] lg:pt-[180px] pb-20'>
        <div className='container mx-auto'>
          <div className='-mx-4 flex flex-wrap items-center'>
            <div className='w-full px-4'>
              <div
                className='hero-content wow fadeInUp mx-auto max-w-[780px] text-center'
                data-wow-delay='.2s'>
                {/* 主标题 */}
                <h1 className='mb-6 text-4xl font-semibold leading-tight text-gray-900 dark:text-white sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-[1.1] tracking-tight'>
                  {siteConfig('STARTER_HERO_TITLE_1', null, config)}
                </h1>
                {/* 次标题 */}
                <p className='mx-auto mb-10 max-w-[600px] text-lg font-normal text-gray-600 dark:text-gray-400 sm:text-xl sm:leading-relaxed'>
                  {siteConfig('STARTER_HERO_TITLE_2', null, config)}
                </p>
                {/* 按钮组 */}
                <ul className='mb-10 flex flex-wrap items-center justify-center gap-4'>
                  {siteConfig('STARTER_HERO_BUTTON_1_TEXT', null, config) && (
                    <li>
                      <SmartLink
                        href={siteConfig('STARTER_HERO_BUTTON_1_URL', '')}
                        className='inline-flex items-center justify-center rounded-full bg-gray-900 dark:bg-white px-8 py-3 text-center text-sm font-medium text-white dark:text-gray-900 shadow-sm transition-all duration-200 ease-in-out hover:opacity-90 hover:shadow-md'>
                        {siteConfig('STARTER_HERO_BUTTON_1_TEXT', null, config)}
                      </SmartLink>
                    </li>
                  )}
                  {siteConfig('STARTER_HERO_BUTTON_2_TEXT', null, config) && (
                    <li>
                      <SmartLink
                        href={siteConfig(
                          'STARTER_HERO_BUTTON_2_URL',
                          null,
                          config
                        )}
                        target='_blank'
                        className='flex items-center rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-8 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 transition-all duration-200 ease-in-out hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                        rel='noreferrer'>
                        {siteConfig(
                          'STARTER_HERO_BUTTON_2_ICON',
                          null,
                          config
                        ) && (
                          <img
                            className='mr-4'
                            src={siteConfig(
                              'STARTER_HERO_BUTTON_2_ICON',
                              null,
                              config
                            )}
                          />
                        )}
                        {siteConfig('STARTER_HERO_BUTTON_2_TEXT', null, config)}
                      </SmartLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* 产品预览图片 */}
            {siteConfig('STARTER_HERO_PREVIEW_IMAGE', null, config) && (
              <div className='w-full px-4'>
                <div
                  className='wow fadeInUp relative z-10 mx-auto max-w-[845px]'
                  data-wow-delay='.25s'>
                  <div className='mt-16'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={siteConfig(
                        'STARTER_HERO_PREVIEW_IMAGE',
                        null,
                        config
                      )}
                      alt={siteConfig('TITLE', null, config)}
                      title={siteConfig('TITLE', null, config)}
                      className='mx-auto max-w-full rounded-t-xl rounded-tr-xl'
                    />
                  </div>

                  {/* 背景图 */}
                  <div className='absolute -left-9 bottom-0 z-[-1]'>
                    <img src='/images/starter/bg-hero-circle.svg' />
                  </div>
                  <div className='absolute -right-6 -top-6 z-[-1]'>
                    <img src='/images/starter/bg-hero-circle.svg' />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 横幅图片 */}
      {siteConfig('STARTER_HERO_BANNER_IMAGE', null, config) && (
        <div className='container mx-auto'>
          <LazyImage
            priority
            className='w-full'
            src={siteConfig(
              'STARTER_HERO_BANNER_IMAGE',
              null,
              config
            )}></LazyImage>
        </div>
      )}
      {/* <!-- ====== Hero Section End --> */}
    </>
  )
}
