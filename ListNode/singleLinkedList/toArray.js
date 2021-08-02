/**
 * 链表转数组：迭代、递归
 */
const toArrayByIteration = (head) => {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  return arr
}

const toArrayByRecursion = (head) => {
  const arr = []

  ;(function loop(head) {
    if (!head) return
    arr.push(head.val)
    loop(head.next)
  })(head)

  return arr
}

module.exports = {
  toArrayByIteration,
  toArrayByRecursion
}
