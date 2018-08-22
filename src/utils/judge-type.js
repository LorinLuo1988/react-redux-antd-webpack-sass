let judgetType = {}
const types = [
  {type: 'String', name: 'isString'},
  {type: 'Number', name: 'isNumber'},
  {type: 'Array', name: 'isArray'},
  {type: 'Object', name: 'isObject'},
  {type: 'Boolean', name: 'isBoolean'},
  {type: 'Function', name: 'isFunc'}
]

function baseJudgeType (type) {
  return function (value) {
    return Object.prototype.toString.call(value).toUpperCase() === `[object ${type}]`.toUpperCase()
  }
}

types.forEach(type => (judgetType[type.name] = baseJudgeType(type.type)))

export {
  judgetType
}
