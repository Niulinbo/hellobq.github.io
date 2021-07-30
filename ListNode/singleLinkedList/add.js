const Node = require('../node')

/**
 * 插入值/址：链头、链中，链尾
 */
const addAtTail = (head, n) => {
  const node = new Node({ val: n, next: null })
  if (!head) return node

  let p = head
  while (p.next) {
    p = p.next
  }
  p.next = node
  return head
}

const addAtHead = (head, n) => {
  const node = new Node({ val: n, next: null })
  node.next = head
  return node
}

const addAtMiddle = (head, index, n) => {
  const node = new Node({ val: n, next: null })

  --index
  if (!head || index <= 0) {
    node.next = head
    return node
  }

  let p = head, prev = null, i = 0
  while (i < index - 1 && p) {
    ++i
    prev = p
    p = p.next
  }
  if (i === index - 1) {    // 找到 index - 1 节点
    node.next = p.next
    p.next = node
  } else {
    prev.next = node
  }

  return head
}

const addPosAtTail = (head, nPos) => {
  if (!nPos) return head
  if (!head) return nPos
  
  let p = head
  while (p.next) p = p.next
  p.next = nPos
  return head
}

const addPosAtMiddle = (head, index, nPos) => {
  --index
  if (!head || index <= 0) {
    nPos.next = head
    return nPos
  }

  let p = head, prev = null, i = 0
  while (i < index - 1 && p) {
    ++i
    prev = p
    p = p.next
  }
  if (i === index - 1) {
    nPos.next = p.next
    p.next = nPos
  } else {
    prev.next = nPos
  }

  return head
}

const addPosAtHead = (head, nPos) => {
  nPos.next = head
  return nPos
}

module.exports = {
  addAtTail,
  addAtMiddle,
  addAtHead,

  addPosAtTail,
  addPosAtMiddle,
  addPosAtHead
}

