

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
    var n = 0
    var cur = head
    while(cur!=null){
        n+=1
        cur=cur.next
    }
    var dummy = new ListNode()
    var p0 = dummy
    p0.next = head
    var pre = null
    cur = p0.next
    while(n>=k){
        n-=k
        for (let i=0;i<k;i++){
            var next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        var next = p0.next
        p0.next.next = cur
        p0.next = pre
        p0 = next
    }
    return dummy.next
};