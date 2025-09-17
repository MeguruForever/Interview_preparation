function lengthOfLongestSubstring(s: string): number {
    let ans = 0
    const cnt: Map<string, number> = new Map()
    let left = 0
    const st = Array.from(s)
  
    st.forEach((ch, r) => {
      // 先取出现次数，没有就用 0
      const prev = cnt.get(ch) ?? 0
      cnt.set(ch, prev + 1)
  
      // 如果当前字符出现次数超过 1，则缩小窗口
      while ((cnt.get(ch) ?? 0) > 1) {
        const leftChar = st[left]
        cnt.set(leftChar, (cnt.get(leftChar) ?? 0) - 1)
        left++
      }
  
      ans = Math.max(ans, r - left + 1)
    })
  
    return ans
  }
  