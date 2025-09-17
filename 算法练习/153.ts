function findMin(nums: number[]): number {
    var l = -1
    var r = nums.length -1
    var n = nums.length -1
    while(l+1<r){
        var mid = Math.floor((l+r)/2)
        if (nums[mid]>nums[n]){
            l = mid
        }else{
            r = mid
        }
    }
    return nums[r]
};

function findMin1(nums: number[]): number {
    return Math.min(...nums)
};