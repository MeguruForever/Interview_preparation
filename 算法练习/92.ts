function reverseBetween(
	head: ListNode | null,
	left: number,
	right: number
): ListNode | null {
	var dummy = new ListNode(0);
    dummy.next = head;
	var p0:ListNode|null = dummy;
	for (let i = 0; i < left - 1; i++) {
		p0 = p0.next;
	}
	
	for (let i = 0; i < right - left + 1; i++) {
		var next = cur.next;
		cur.next = pre;
		pre = cur;
		cur = next;
	}
	p0.next.next = cur;
	p0.next = pre;
	return dummy.next;
}
