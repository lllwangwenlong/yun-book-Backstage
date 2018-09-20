import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: () => import('../views/login/login'),
  home: () => import('../views/home/home'),
  index: () => import('../views/index/index'),
  users: () => import('../views/users/index'),
  userslist: () => import('../views/userslist/index'),
  usersadd: () => import('../views/usersadd/index'),
  userInfoEdit: () => import('../views/userInfoEdit/index'),
  upload: () => import('../views/upload/index'),
  userDetail: () => import('../views/userDetail/index'),
  passwordEdit: () => import('../views/passwordEdit/index'),
  books: () => import('../views/books/index'),
  booksDetail: () => import('../views/booksDetail/index'),
  bookDetail: () => import('../views/bookDetail/index'),
  addClassify: () => import('../views/addClassify/index'),
  addBooks: () => import('../views/addBooks/index'),
  booksEdit: () => import('../views/booksEdit/index'),
  swraperList: () => import('../views/swraperList/index'),
  addSwraper: () => import('../views/addSwraper/index'),
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: components.login
    },
    {
      path: '/home',
      name: 'home',
      component: components.home,
      redirect: '/home/index',
      meta: {
        title: '首页'
      },
      children: [
        {
          path: 'index',
          component: components.index
        },
        {
          path: 'users',
          meta: {
            title: '用户管理'
          },
          component: components.users
        },
        {
          path: 'userslist',
          name: 'userslist',
          meta: {
            title: '用户列表'
          },
          component: components.userslist
        },
        {
          path: 'usersadd',
          name: 'usersadd',
          meta: {
            title: '用户添加'
          },
          component: components.usersadd
        },
        {
          path: 'userInfoEdit',
          name: 'userInfoEdit',
          meta: {
            title: '编辑信息'
          },
          component: components.userInfoEdit
        },
        {
          path: 'upload',
          name: 'upload',
          meta: {
            title: '上传图片'
          },
          component: components.upload
        },
        {
          path: 'userDetail',
          name: 'userDetail',
          meta: {
            title: '用户信息'
          },
          component: components.userDetail
        },
        {
          path: 'passwordEdit',
          name: 'passwordEdit',
          meta: {
            title: '修改密码'
          },
          component: components.passwordEdit
        },
        {
          path: 'books',
          name: 'books',
          meta: {
            title: '图书分类管理'
          },
          component: components.books
        },
        {
          path: 'booksDetail',
          name: 'booksDetail',
          meta: {
            title: '图书管理'
          },
          component: components.booksDetail
        },
        {
          path: 'addClassify',
          name: 'addClassify',
          meta: {
            title: '添加分类'
          },
          component: components.addClassify
        },
        {
          path: 'addBooks',
          name: 'addBooks',
          meta: {
            title: '添加图书'
          },
          component: components.addBooks
        },
        {
          path: 'booksEdit',
          name: 'booksEdit',
          meta: {
            title: '编辑分类'
          },
          component: components.booksEdit
        },
        {
          path: 'bookDetail',
          name: 'bookDetail',
          meta: {
            title: '图书详情'
          },
          component: components.bookDetail
        },
        {
          path: 'swraperList',
          name: 'swraperList',
          meta: {
            title: '轮播图列表'
          },
          component: components.swraperList
        },
        {
          path: 'addSwraper',
          name: 'addSwraper',
          meta: {
            title: '添加轮播图'
          },
          component: components.addSwraper
        },
        {
          path: 'editSwraper',
          name: 'editSwraper',
          meta: {
            title: '修改轮播图'
          },
          component: components.addSwraper
        },
      ]
    },
  ]
})
