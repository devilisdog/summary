const meun = [
  { title: "首页", icon: "", path: "/homePage" },
  {
    title: "组件",
    icon: "",
    path: "/componentsView",
  },

  {
    title: "page2",
    icon: "",
    path: "/page2",
    children: [
      { title: "二级1", icon: "", path: "/page2/child1" },
      { title: "二级2", icon: "", path: "/page2/child2" },
    ],
  },
];

export default meun;
