const Node = require('./node')
const createFromArray = require('./singleLinkedList/createFromArray')
const { toArrayByIteration } = require('./singleLinkedList/toArray')
const { addAtTail, addAtHead, addAtMiddle, addPosAtTail, addPosAtHead, addPosAtMiddle } = require('./singleLinkedList/add')
const { deleteByVal, deleteByValPoi, deleteByPreviousValPoi } = require('./singleLinkedList/delete')

const list = createFromArray([1, 2, 3])

let node1 = new Node({ val: 4, next: null })
let node2 = new Node({ val: 5, next: null })
addPosAtMiddle(list, 2, node1)
let p = addPosAtMiddle(list, 3, node2)
while (p) {
  console.log(p.val)
  p = p.next
}

console.log()
console.log()
p = deleteByPreviousValPoi(list, node1)
while (p) {
  console.log(p.val)
  p = p.next
}
