const meun = [
    { title: '首页', icon: '', path: '/homePage' },
    {
        title: '组件',
        icon: '',
        path: '/componentsView',
    },

    {
        title: '组件库',
        icon: '',
        path: '/components',
        children: [
            { title: '虚拟滚动列表', icon: '', path: '/components/virtuaList' },
            { title: '轮播图', icon: '', path: '/components/carousel' },
        ],
    },
]

export default meun
