// 链表转数组（迭代）
const toArrayByIteration = (head) => {
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  return arr
}

// 链表转数组（递归）
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
