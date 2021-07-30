/**
 * 删除值/址
 */
const deleteByVal = (head, val) => {
  if (!head) return null
  if (head.val === val) return head = head.next

  for (let p = head.next, prev = head; ; prev = p, p = p.next) {
    if (!p) return head
    if (p.val === val) {
      prev.next = p.next
      return head
    }
  }
}

const deleteByValPoi = (head, valPoi) => {
  if (!head) return null
  if (head === valPoi) return head = head.next

  for (let p = head.next, prev = head; ; prev = p, p = p.next) {
    if (!p) return head
    if (p === valPoi) {
      prev.next = p.next
      return head
    }
  }
}

// 提供了前一节点地址
const deleteByPreviousValPoi = (head, previousValPos) => {
  previousValPos.next = previousValPos.next.next
  return head
}

module.exports = {
  deleteByVal,
  deleteByValPoi,
  deleteByPreviousValPoi
}
