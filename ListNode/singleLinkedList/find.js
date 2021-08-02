/**
 * 查找指定值/址、查找第 n 个节点
 */

const findNodeByVal = (head, val) => {
  if (!head) return false

  let p = head
  while (p && p.val !== val) p = p.next
  return !!p
}

const findNodeByValPos = (head, pos) => {
  console.log(head, pos)
  if (!head) return false

  let p = head
  while (p && p !== pos) p = p.next
  return !!p
}

const findValAtN = (head, n) => {
  if (!head) return null

  let p = head, c = 1
  while (p && c !== n) {
    p = p.next
    c++
  }

  return p
}

module.exports = {
  findNodeByVal,
  findNodeByValPos,
  findValAtN
}
