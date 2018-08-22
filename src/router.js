import { PageRouterSwitchProgress, AsyncLoadComponent, ReMountRouterComponent } from '@/components/common'

const wrapperComponent = Component => (
  ReMountRouterComponent(PageRouterSwitchProgress(AsyncLoadComponent(Component)))
)

// 概况
const Home = wrapperComponent(() => import('@containers/Home'))

const routerFactory = () => ({
  path: '/',
  children: [
    {
      path: '/home',
      title: '主页',
      component: Home,
      icon: 'icon-icon_survey'
    }
  ]
})

export default routerFactory