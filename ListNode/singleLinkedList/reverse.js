/**
 * 单链表反转：迭代、递归
 */

const reverseByIteration = head => {
  if (!head || !head.next) return head

  let p = null, q = null
  while (head) {
    q = head.next
    head.next = p
    p = head
    head = q
  }
  return p
}

const reverseByRecursion = head => {
  if (head == null || head.next == null) {
    return head
  }

  const newHead = reverseByRecursion(head.next)
  head.next.next = head
  head.next = null
  return newHead
}

module.exports = {
  reverseByIteration,
  reverseByRecursion
}
