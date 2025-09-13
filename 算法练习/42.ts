function trap(height: number[]): number {
    if(height.length==0){
        return 0
    }
    var n = height.length
    var pre_max = []
    pre_max.push(height[0])
    for (let i=1;i<n;i++){
        pre_max.push(
            Math.max(pre_max[i-1],height[i])
        )
    }
    var suf_max = []                                
    suf_max.unshift(height[n-1])
    for(let i=n-1;i>=0;i--){
        suf_max.unshift(
            Math.max(suf_max[0],height[i])
        )
    }
    var ans = 0
    for (let i = 0;i<n;i++){
        ans += Math.min(pre_max[i],suf_max[i])-height[i]
    }
    return ans
};