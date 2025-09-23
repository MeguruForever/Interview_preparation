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

function deleteDuplicates(head: ListNode | null): ListNode | null {
    if (!head){
        return head
    }
    var dummy = new ListNode()
    dummy.next = head
    var a = dummy.next
    var temp = dummy
    while (a&&a.next){
        if(a.next.val!=a.val){
            a=a.next
            temp = temp.next
        }else{
            while(a&&a.next&&a.next.val===a.val){
                a=a.next
            }
            a=a.next
            temp.next = a
        }
    }
    return dummy.next
};