import React, { useRef, useEffect, useState } from 'react'
import rightIcon from '@src/images/rightIcon.png'
import leftIcon from '@src/images/leftIcon.png'

import './index.scss'

const arr = [
    { id: 1, pircture: 1, background: '//cdnmusic.migu.cn/tycms_picture/21/05/133/21051321351362_1400x350_6570.jpg' },
    { id: 2, pircture: 2, background: '//cdnmusic.migu.cn/tycms_picture/21/05/133/210513004642261_1400x350_3302.jpg' },
    { id: 3, pircture: 3, background: '//cdnmusic.migu.cn/tycms_picture/20/03/79/200319225515423_1400x350_5570.jpg' },
    { id: 4, pircture: 4, background: '//cdnmusic.migu.cn/tycms_picture/21/05/133/210513090033885_1400x350_6712.jpg' },
    { id: 5, pircture: 5, background: '//cdnmusic.migu.cn/tycms_picture/21/05/130/210510093809848_1400x350_9948.jpg' },
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

    const setTransition = () => {
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
        scroll_box_ref.current.style.transform = `translate3d(${(1 - currentIndex) * 900}px, 0, 0)`
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
        handleChangeActive(currentIndex === 0 ? arr.length : currentIndex - 1)
    }

    // 下一页
    const handleNext = () => {
        // 对临界值进行处理
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
                            return <div style={{ left: -1 * 900 }}>{}</div>
                        }
                        // 当轮播图处于最后一个时，第一个组件提取到最后面
                        if (currentIndex >= arr.length && index === 0) {
                            return <div style={{ left: arr.length * 900 }}>{}</div>
                        }

                        return <div className="scroll_item" key={item.id} style={{ background: `url(${item.background}) 100% 100%` }}></div>
                    })}
                </div>
                <div onClick={handlePrev} className="buttonLeft">
                    <img src={leftIcon} alt="" style={{ width: '50px', height: '50px' }} />
                </div>
                <div onClick={handleNext} className="buttonRight">
                    <img src={rightIcon} alt="" style={{ width: '50px', height: '50px' }} />
                </div>
            </div>
        </div>
    )
}
