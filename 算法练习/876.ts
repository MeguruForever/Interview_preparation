function middleNode(head: ListNode | null): ListNode | null {
    var slow = head
    var fast = head

    while(fast!=null&&fast.next!=null){
        fast = fast.next.next
        slow = slow.next
    }
    return slow
};