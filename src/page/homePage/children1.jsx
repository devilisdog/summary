import React, { useState, useEffect } from 'react'
import eventEmitter from '@src/utils/eventEmitter'

export default function Children1() {
    const [data, setdata] = useState(null)

    eventEmitter.on('add', (name, parmas, parmas2) => {
        console.log(name, parmas, parmas2, '接受参数')
        setdata(parmas.data)
    })

    return (
        <>
            <h2>组件Children1</h2>
            <div>拿到Children2传过来的参数:{data}</div>
        </>
    )
}
