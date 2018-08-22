import { isObject, isArray } from './judge-type'

const findNodeInTree = (tree, options) => {
  const len = tree.length

  options.key = options.key || 'id'
  options.value = options.value || ''
  
  for (let i = 0; i < len; i++) {
    let node = tree[i]
    
    if (options.value == node[options.key]) {
      return node
    }

    if (node.children && node.children.length) {
      let returnNode = findNodeInTree(node.children, options)

      if (returnNode) {
        return returnNode
      }
    }
  }

  return null
}

/**
 * 遍历树
 * @param  {Object || Array} tree      树
 * @param  {Function} condition        条件函数
 * @param  {Function} matchCallback    满足条件的回掉函数
 * @param  {Function} mismatchCallback 不满足条件的回掉函数
 * @return {undefined}                 undefined
 */
const traversalTree = (tree, parent, conditionFn = () => {}, matchCallback = () => {}, mismatchCallback = () => {}) => {
  if (isObject(tree)) {
    if (conditionFn(tree)) {
      matchCallback(tree, parent)
    } else {
      mismatchCallback(tree, parent)
    }

    if (tree.children && tree.children.length) {
      traversalTree(tree.children, tree, conditionFn, matchCallback, mismatchCallback)
    }
  } else if (isArray(tree)) {
    let prevLen = tree.length
    let len = tree.length

    for (let i = 0; i < len; i++) {
      traversalTree(tree[i], parent, conditionFn, matchCallback, mismatchCallback)
      prevLen = len
      len = tree.length
      i = i - (prevLen - len)
    }
  }
}

export {
  findNodeInTree,
  traversalTree
}