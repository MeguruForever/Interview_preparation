/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function isSymmetric(root: TreeNode | null): boolean {
    var flag = true
    function dfs(p,q){
        if (p==null&&q!=null){
            flag =false
            return
        }
        if (q==null&&p!=null){
            flag =false
            return
        }
        if(p==null&&q==null){
            return
        }
        if (p.val!=q.val){
            flag =false
            return
        }
        dfs(p.left,q.right)
        dfs(p.right,q.left)
    }
    dfs(root.left,root.right)
    return flag
};