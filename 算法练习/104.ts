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

function maxDepth(root: TreeNode | null): number {
    var num = 0
    function dfs(root,nums) {
        if (root){
            num = Math.max(nums,num)
            dfs(root.left,nums+1)
            dfs(root.right,nums+1)
        }
    }
    dfs(root,1)
    return num
};