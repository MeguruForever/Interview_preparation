function detectCycle(head: ListNode | null): ListNode | null {
    var slow = head
    var fast = head
    //a+(n+1)b+nc=2(a+b)⟹a=c+(n−1)(b+c)
    while(fast&&fast.next){
        fast = fast.next.next
        slow = slow.next
        if (fast == slow){
            while(slow!=head){
                slow =slow.next
                head = head.next
            }
            return slow
        }
    }
    return null
};