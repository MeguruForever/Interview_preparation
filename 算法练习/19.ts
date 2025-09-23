/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    var dummy = new ListNode()
    dummy.next = head
    var fast = dummy
    var slow = dummy
    for(let i =0;i<n;i++){
        fast = fast.next
    }
    while(fast.next){
        fast = fast.next
        slow = slow.next
    }

    slow.next = slow.next.next
    return dummy.next
};