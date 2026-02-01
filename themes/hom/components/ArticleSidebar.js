import throttle from 'lodash.throttle'
import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useState } from 'react'

/**
 * 文章标题侧边栏
 * @param {*} param0
 * @returns
 */
export const ArticleSidebar = ({ post }) => {
    const toc = post?.toc
    const [activeSection, setActiveSection] = useState(null)

    // 过滤标题，只显示最多3层（indentLevel 0, 1, 2）
    const filteredToc = toc?.filter(tocItem => {
        const indentLevel = tocItem.indentLevel || 0
        return indentLevel < 3
    }) || []

    // 设置默认选中第一个标题
    useEffect(() => {
        if (filteredToc.length > 0 && !activeSection) {
            const firstId = uuidToId(filteredToc[0].id)
            setActiveSection(firstId)
        }
    }, [filteredToc])

    const throttleMs = 200
    const actionSectionScrollSpy = useCallback(
        throttle(() => {
            const sections = document.getElementsByClassName('notion-h')
            if (sections.length === 0) return

            let prevBBox = null
            let currentSectionId = null

            for (let i = 0; i < sections.length; ++i) {
                const section = sections[i]
                if (!section || !(section instanceof Element)) continue
                if (!currentSectionId) {
                    currentSectionId = section.getAttribute('data-id')
                }
                const bbox = section.getBoundingClientRect()
                const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
                const offset = Math.max(150, prevHeight / 4)
                if (bbox.top - offset < 0) {
                    currentSectionId = section.getAttribute('data-id')
                    prevBBox = bbox
                    continue
                }
                break
            }
            if (currentSectionId) {
                setActiveSection(currentSectionId)
            }
        }, throttleMs),
        [filteredToc]
    )

    // 监听滚动事件，高亮当前标题
    useEffect(() => {
        if (!filteredToc || filteredToc.length === 0) return

        // 延迟执行，确保页面内容已渲染
        const timer = setTimeout(() => {
            actionSectionScrollSpy()
        }, 100)

        window.addEventListener('scroll', actionSectionScrollSpy)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('scroll', actionSectionScrollSpy)
        }
    }, [actionSectionScrollSpy, filteredToc])


    // 无目录就直接返回空
    if (!filteredToc || filteredToc.length === 0) {
        return null
    }

    return (
        <aside className='hidden xl:block absolute left-[calc(50%+20.5rem)] top-0 sticky top-24 w-44 max-h-[calc(100vh-8rem)] overflow-y-auto ml-10' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <nav className='space-y-0.5'>
                {filteredToc.map(tocItem => {
                    const id = uuidToId(tocItem.id)
                    const isActive = activeSection === id
                    const indentLevel = tocItem.indentLevel || 0

                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            className={`block text-xs py-1.5 px-2 rounded transition-all ${isActive
                                ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-800'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                            style={{
                                paddingLeft: `${indentLevel * 12 + 8}px`
                            }}>
                            <span className='truncate block leading-relaxed'>{tocItem.text}</span>
                        </a>
                    )
                })}
            </nav>
        </aside>
    )
}
