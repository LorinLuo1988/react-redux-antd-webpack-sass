import { traversalTree } from './tree'

const findParentsByKey = (path = '/', parent = [], key = 'id') => {
  let keyList = []
  const children = parent.children

  // 找到了，直接返回
  if (path === parent.path) {
    return [parent[key]]
  }

  // 没有子节点，直接返回null
  if (!children || !children.length) {
    return null
  }

  //开始找
  let findKeyList = null

  for (let child of children) {
    findKeyList = findParentsByKey(path, child, key)
    
    // 已经找到，退出循环
    if (findKeyList !== null) {
      break
    }
  }

  //没找到 ，返回空
  if (findKeyList === null) {
    return null
  }

  //子节点中找到了，添加一下
  //先添加自己
  keyList.push(parent[key])
  //再添加子节点的list
  keyList = keyList.concat(findKeyList)

  return keyList
}

const routerFactoryByPermissions = (permissions = [], router = {}) => {
  const permissionCodes = permissions.map(permission => permission.code)

  traversalTree(router.children, router, node => (
    node.children ?
      !permissionCodes.some(permissionCode => permissionCode.startsWith(node.code.slice(0, 2))) :
      !permissionCodes.includes(node.code)
  ), (node, parent) => {
    const index = parent.children.findIndex(item => node === item)

    parent.children.splice(index, 1)
  })

  return router
}

export {
  findParentsByKey,
  routerFactoryByPermissions
}