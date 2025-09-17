class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val?: number, next?: ListNode | null) {
		this.val = val === undefined ? 0 : val;
		this.next = next === undefined ? null : next;
	}
}
function reverseList(head: ListNode | null): ListNode | null {
	var pre:ListNode | null = null;
	var cur = head;
	while (cur != null) {
		console.log(cur.val);
		var temp = cur.next;
		cur.next = pre;
		pre = cur; 
		cur = temp;
	}
	return pre;
}
