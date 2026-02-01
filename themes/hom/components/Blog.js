/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

/**
 * 博文列表
 * @param {*} param0
 * @returns
 */
export const Blog = ({ posts }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5
    return (
        <>
            {/* <!-- ====== Blog Section Start --> */}
            <section className='bg-white pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]'>
                <div className='container mx-auto'>
                    {/* 区块标题文字 */}
                    <div className='-mx-4 flex flex-wrap justify-center'>
                        <div className='w-full px-4'>
                            <div className='mx-auto mb-[60px] max-w-[485px] text-center'>
                                <span className='mb-2 block text-lg font-semibold text-primary'>
                                    {siteConfig('STARTER_BLOG_TITLE')}
                                </span>
                                <h2 className='mb-4 text-3xl font-bold text-dark dark:text-white sm:text-4xl md:text-[40px] md:leading-[1.2]'>
                                    {siteConfig('STARTER_BLOG_TEXT_1')}
                                </h2>
                                <p
                                    dangerouslySetInnerHTML={{
                                        __html: siteConfig('STARTER_BLOG_TEXT_2')
                                    }}
                                    className='text-base text-body-color dark:text-dark-6'></p>
                            </div>
                        </div>
                    </div>
                    {/* 博客列表 此处优先展示3片文章 */}
                    <div className='flex flex-col mx-auto max-w-2xl'>
                        {(() => {
                            // 计算分页
                            const totalPosts = posts?.length || 0
                            const totalPages = Math.ceil(totalPosts / postsPerPage)
                            const startIndex = (currentPage - 1) * postsPerPage
                            const endIndex = startIndex + postsPerPage
                            const currentPosts = posts?.slice(startIndex, endIndex) || []

                            // 按年分组
                            const groupedByYear = {}
                            currentPosts.forEach((item) => {
                                if (item.publishDay) {
                                    const year = item.publishDay.split('-')[0]
                                    if (!groupedByYear[year]) {
                                        groupedByYear[year] = []
                                    }
                                    groupedByYear[year].push(item)
                                }
                            })

                            // 按年份倒序排列
                            const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a)

                            return (
                                <>
                                    {sortedYears.map((year) => (
                                        <div key={year} className='w-full px-4 mb-8'>
                                            <h3 className='text-2xl font-bold text-dark dark:text-white mb-4'>
                                                {year}
                                            </h3>
                                            {groupedByYear[year].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className='wow fadeInUp group mb-6'
                                                    data-wow-delay='.1s'>
                                                    <div className='flex items-center gap-4'>
                                                        <span className='inline-block text-xs font-medium leading-loose text-body-color dark:text-dark-6 min-w-[80px]'>
                                                            {item.publishDay}
                                                        </span>
                                                        <h3 className='flex-1'>
                                                            <SmartLink
                                                                href={item?.href}
                                                                className='inline-block text-sm font-normal text-dark hover:text-primary dark:text-white dark:hover:text-primary'>
                                                                {item.title}
                                                            </SmartLink>
                                                        </h3>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}

                                    {/* 分页按钮 */}
                                    {totalPages > 1 && (
                                        <div className='flex items-center gap-3 mt-8 px-4'>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                                disabled={currentPage === 1}
                                                className='flex items-center gap-1 px-3 py-1.5 text-xs font-normal rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all'>
                                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                                                </svg>
                                                <span>上一页</span>
                                            </button>
                                            <span className='text-xs text-gray-500 dark:text-gray-400 font-light'>
                                                {currentPage} / {totalPages}
                                            </span>
                                            <button
                                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                                disabled={currentPage === totalPages}
                                                className='flex items-center gap-1 px-3 py-1.5 text-xs font-normal rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-all'>
                                                <span>下一页</span>
                                                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                </div>
            </section>
            {/* <!-- ====== Blog Section End --> */}
        </>
    )
}
