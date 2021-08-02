const Node = require('./node')
const createFromArray = require('./singleLinkedList/createFromArray')
const { toArrayByIteration } = require('./singleLinkedList/toArray')
const { addAtTail, addAtHead, addAtMiddle, addPosAtTail, addPosAtHead, addPosAtMiddle } = require('./singleLinkedList/add')
const { deleteByVal, deleteByValPoi, deleteByPreviousValPoi } = require('./singleLinkedList/delete')
const { findNodeByVal, findNodeByValPos, findValAtN } = require('./singleLinkedList/find')

let list = createFromArray([])

let node1 = new Node({ val: 4, next: null })
let p = list = addPosAtMiddle(list, 2, node1)
while (p) {
  console.log(p.val)
  p = p.next
}

let bool = findValAtN(list, 100)
console.log(bool)
