function findPeakElement(nums: number[]): number {
    return nums.indexOf(Math.max(...nums))
};

function findPeakElement1(nums: number[]): number {
    var l = -1
    var r = nums.length-1

    while(l+1<r){
        let mid = Math.floor((l+r)/2)
        if (nums[mid]>nums[mid+1]){
            r = mid
        }else{
            l = mid
        }
    }
    return r
}