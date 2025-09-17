function search(nums: number[], target: number): number {
    function isBlue(i:number):boolean{
        var end = nums[nums.length-1]
        if(nums[i]>end){
            return target>end && nums[i]>=target
        }else {
            return target>end || nums[i]>=target
        }
    }
    var l = -1
    var r = nums.length
    while(l+1<r){
        var mid = Math.floor((l+r)/2)
        if (isBlue(mid)){
            r = mid
        }else {
            l= mid
        }
    }
    if (r==nums.length||nums[r]!=target){
        return -1
    }
    return r
};