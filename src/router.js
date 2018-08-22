import { PageRouterSwitchProgress, AsyncLoadComponent } from '@/components/common'

const wrapperComponent = Component => (
  PageRouterSwitchProgress(AsyncLoadComponent(Component))
)

// 首页
const Home = wrapperComponent(() => import('@containers/Home'))

// 设置
const Setting = wrapperComponent(() => import('@containers/Setting'))

const routerFactory = () => ({
  path: '/',
  children: [
    {
      path: '/home',
      title: '主页',
      component: Home,
      icon: 'home'
    },
    {
      path: '/setting',
      title: '设置',
      component: Setting,
      icon: 'setting'
    }    
  ]
})

export default routerFactory