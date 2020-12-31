const meun = [
    { title: '首页', icon: '', path: '/' },
    {
        title: 'page1',
        icon: '',
        path: '/page1',
    },

    {
        title: 'page2',
        icon: '',
        path: '/page2',
        children: [
            { title: '二级1', icon: '', path: '/page2/child1' },
            { title: '二级2', icon: '', path: '/page2/child2' },
        ],
    },
]

export default meun
