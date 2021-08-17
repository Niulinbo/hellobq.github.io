const Node = require('../node')

const createFromArray = (arr) => {
  let tmp = null, cur = null

  for (let i = 0; i < arr.length; ++i) {
    cur = new Node({
      val: arr[i],
      next: null
    })
    if (i > 0) {
      cur.next = tmp
    }
    tmp = cur
  }

  // while (tmp) {
  //   console.log(tmp.val)
  //   tmp = tmp.next
  // }

  let prevNode = null
  while (cur) {
    tmp = cur.next
    cur.next = prevNode
    prevNode = cur
    cur = tmp
  }

  let head = prevNode
  while (prevNode) {
    // console.log(prevNode.val)
    prevNode = prevNode.next
  }

  return head
}

module.exports = createFromArray
