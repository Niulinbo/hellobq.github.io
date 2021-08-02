const Node = require('./node')
const createFromArray = require('./singleLinkedList/createFromArray')
const { toArrayByIteration } = require('./singleLinkedList/toArray')
const { addAtTail, addAtHead, addAtMiddle, addPosAtTail, addPosAtHead, addPosAtMiddle } = require('./singleLinkedList/add')
const { deleteByVal, deleteByValPoi, deleteByPreviousValPoi } = require('./singleLinkedList/delete')
const { findNodeByVal, findNodeByValPos, findValAtN } = require('./singleLinkedList/find')
const { reverseByIteration, reverseByRecursion } = require('./singleLinkedList/reverse')

let list = createFromArray([1, 2, 3])

// let node1 = new Node({ val: 4, next: null })
let p = list
while (p) {
  console.log(p.val)
  p = p.next
}

p = reverseByRecursion(list)
while (p) {
  console.log(p.val)
  p = p.next
}
