import { groupBy } from 'lodash'

const arr = [
    { id: 1, name: '中华人民共和国', parentId: 0 },
    { id: 1001, name: '浙江省', parentId: 1 },
    { id: 2001, name: '杭州市', parentId: 1001 },
    { id: 3001, name: '西湖区', parentId: 2001 },
    { id: 4001, name: '杭州市第一人民医院', parentId: 3001 },
]

/**
 *
 * @param {Array} itemArray  目标数组
 * @description 数组转化成树形数组
 */

//第一版：非递归处理树    时间复杂度：O(n^2)
const buildTree = (itemArray, { id = 'id', parentId = 'parentId', children = 'children', topLevelId = '0' } = {}) => {
    return itemArray.filter((item) => {
        // 挂载子级
        item[children] = itemArray.filter((child) => String(item[id]) === String(child[parentId]))
        // 返回顶层数据
        return String(item[parentId]) === topLevelId
    })
}

//第二版：非递归处理树    时间复杂度：O(2n)
const buildTree_two = (itemArray, { id = 'id', parentId = 'parentId', children = 'children', topLevelId = '0' } = {}) => {
    const parentObj = groupBy(itemArray, parentId)
    return itemArray.filter((item) => {
        // 挂载子级
        item[children] = parentObj[item[id]]
        // 返回顶层数据
        return String(item[parentId]) === topLevelId
    })
}

//终极版：非递归处理树   时间复杂度：O(n)
const buildTree_three = (itemArray, { id = 'id', parentId = 'parentId', children = 'children', topLevelId = '0' } = {}) => {
    const parentMap = new Map() // 临时存储所有父级
    const topLevelResult = [] // 存储顶层结果
    for (let item of itemArray) {
        if (!parentMap.has(item[id])) {
            item[children] = []
        } else {
            item[children] = parentMap.get(item[id])[children]
        }

        parentMap.set(item.id, item)

        if (!parentMap.has(item[parentId])) {
            parentMap.set(item[parentId], {
                [children]: [],
            })
        }
        parentMap.get(item[parentId])[children].push(item)
        if (String(item[parentId]) === String(topLevelId)) {
            topLevelResult.push(item)
        }
    }
    return topLevelResult
}
