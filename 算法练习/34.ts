function searchRange(nums: number[], target: number): number[] {
    var l  = 0
    var  r = nums.length-1
    if (nums.length==0){
        return [-1,-1]
    }
    while(l<=r){
        if (nums[Math.floor((l+r)/2)]>target){
            r = Math.floor((l+r)/2)-1
        }else{
            l = Math.floor((l+r)/2)+1
        }
    }
    if (r==nums.length||nums[r]!=target){
        return [-1,-1]
    }
    var ans = [-1,r]
    l  = 0
    r = nums.length-1
    while(l<=r){
        if (nums[Math.floor((l+r)/2)]>target-1){
            r = Math.floor((l+r)/2)-1
        }else{
            l = Math.floor((l+r)/2)+1
        }
    }
    ans[0]=l
    return ans
};