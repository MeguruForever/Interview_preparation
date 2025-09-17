function minSubArrayLen(target: number, nums: number[]): number {
    var n = nums.length
    var ans = n+1
    var s = 0
    var left = 0

    nums.forEach((v,right)=>{
        s+=v
        while(s-nums[left]>=target){
            s -= nums[left]
            left++
        }
        if (s>=target){
            ans = Math.min(ans,right-left+1)
        }
    })
    return ans==n+1?0:ans

};