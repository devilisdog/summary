import React, { useRef, useEffect, useState } from 'react'
import carousel1 from '@src/images/carousel1.jpg'
import carousel2 from '@src/images/carousel2.jpeg'
import carousel3 from '@src/images/carousel3.jpeg'

import './index.scss'

const arr = [
    { id: 1, pircture: 1, background: carousel1 },
    { id: 2, pircture: 2, background: carousel2 },
    { id: 3, pircture: 3, background: carousel3 },
    { id: 4, pircture: 4, background: carousel1 },
    { id: 5, pircture: 5, background: carousel2 },
]

// 获取当前可视区容器宽度
// const SCREEN_WIDTH = window.screen.width

export default function Carousel() {
    const scroll_box_ref = useRef(null)

    const [currentIndex, setCurrentIndex] = useState(1)
    const [status, setStatus] = useState(1)

    useEffect(() => {
        setTransition()
    }, [currentIndex])

    const setTransition = (offset = 0) => {
        function transitionend() {
            // 动画结束后就关闭动画
            scroll_box_ref.current.style.transitionProperty = 'none'
            // 恢复状态为1静止
            setStatus(1)
            // 当前位置在补位的位置时马上切换到本该在的位置
            if (currentIndex === 0) {
                // 使用setTimeout包裹，避免transitionProperty动画未关闭就切换的闪频
                setTimeout(() => {
                    setCurrentIndex(arr.length)
                }, 0)
            }
            if (currentIndex === arr.length + 1) {
                setTimeout(() => {
                    setCurrentIndex(1)
                }, 0)
            }
            scroll_box_ref.current.removeEventListener('transitionend', transitionend, false)
        }

        scroll_box_ref.current.addEventListener('transitionend', transitionend, false)

        // 计算需要移动的距离并进行修改，这是切换的核心
        const distance = (1 - currentIndex) * 600
        scroll_box_ref.current.style.transform = `translate3d(${distance + offset}px, 0, 0)`
    }

    const handleChangeActive = (number) => {
        // 当在动画进行时，不允许切换
        if (status === 2) return
        // 切换前先把动画参数打开
        scroll_box_ref.current.style.transitionProperty = 'all'
        // 修改状态为进行时
        setStatus(2)
        // 改变当前位置
        setCurrentIndex(number)
    }

    // 上一页
    const handlePrev = () => {
        // 对临界值进行处理
        setCurrentIndex(currentIndex === 1 ? arr.length : currentIndex - 1)

        handleChangeActive(currentIndex === 0 ? arr.length : currentIndex - 1)
    }

    // 下一页
    const handleNext = () => {
        // 对临界值进行处理
        setCurrentIndex(currentIndex === arr.length ? 1 : currentIndex + 1)

        handleChangeActive(currentIndex === arr.length + 1 ? 1 : currentIndex + 1)
    }

    return (
        <div className="Carousel">
            <div className="parent_box">
                <ul className="point_list">
                    {arr.map((item, index) => {
                        return <li key={item.id} style={{ width: '12px' }}></li>
                    })}
                </ul>
                <div className="scroll_box" ref={scroll_box_ref}>
                    {arr.map((item, index) => {
                        // 当轮播图处于第一个时，最后一个组件时，提取到最前面去
                        if (currentIndex <= 1 && index + 1 === arr.length) {
                            return (
                                <div
                                    className="scroll_item"
                                    style={{ left: -1 * 600, background: `url(${item.background})`, backgroundSize: '100% 100%' }}
                                    key={item.id}
                                >
                                    {item.pircture}
                                </div>
                            )
                        }
                        // 当轮播图处于最后一个时，第一个组件提取到最后面
                        if (currentIndex >= arr.length && index === 0) {
                            return (
                                <div
                                    className="scroll_item"
                                    style={{ left: arr.length * 600, background: `url(${item.background})`, backgroundSize: '100% 100%' }}
                                    key={item.id}
                                >
                                    {item.pircture}
                                </div>
                            )
                        }

                        return (
                            <div className="scroll_item" key={item.id} style={{ background: `url(${item.background})`, backgroundSize: '100% 100%' }}>
                                {item.pircture}
                            </div>
                        )
                    })}
                </div>
                <div onClick={handlePrev} className="buttonLeft">
                    Left
                </div>
                <div onClick={handleNext} className="buttonRight">
                    Right
                </div>
            </div>
        </div>
    )
}
