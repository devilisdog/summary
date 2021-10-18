import React, { useState } from 'react'
import eventEmitter from '@src/utils/eventEmitter'

export default function Children2() {
    const [num, setNum] = useState(1)

    const emitChildren1 = () => {
        setNum((num) => num + 1)
        eventEmitter.emit('add', { data: num + 1 }, { data2: '22' })
    }

    return (
        <>
            <h2>组件children2</h2>
            <button onClick={emitChildren1}>请点击我触发emit 传值到组件Children </button>
            <div>{num}</div>
        </>
    )
}
