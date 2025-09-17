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

/**
 Do not return anything, modify head in-place instead.
 */
 function reorderList(head: ListNode | null): void {
    var slow = head
    var fast = head
        while(fast&&fast.next){
            fast = fast.next.next
            slow = slow.next
        }
        var pre = null
        var cur = slow
        while(cur!=null){
            var next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        var head2 = pre
        while(head2.next!=null){
            var temp1 = head.next
            head.next = head2   
            var temp2 = head2.next  
            head2.next = temp1 
            head =  temp1
            head2 = temp2
        }
    
};