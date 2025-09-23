
function createTemplate(template = '', option: { dynamic?: string[]; statement?: string } = {}) {
    const { dynamic = ['{{', '}}'], statement = '#' } = option
    
    const RE_CONTENT = `[.\\s\\S]*`
    const RE_DYNAMIC = new RegExp(
        `(${RE_CONTENT}?)${dynamic[0]}(${RE_CONTENT}?)${dynamic[1]}(${RE_CONTENT})`
    )
    const tokens:{type:string,content:string}[] = []
    const createTokens= (tpl:string) =>{
        const match = tpl.match(RE_DYNAMIC)
        // ['template', text, dynamic, nexTemplate] = match
        if (match) {
            match[1] && tokens.push({
                type: 'text',
                content: match[1]
            })
            const dynamicMatch = match[2].trim()
            dynamicMatch && tokens.push({
                type: dynamicMatch.startsWith(statement)? 'statement' : 'dynamic',
                content: dynamicMatch
            })
            match[3] && createTokens(match[3])
        }else {
          tokens.push({
            type: 'text',
            content: tpl
          })
        }
    }
    createTokens(template)

    return function format(data:Record<string, any>){
      return tokens.map((obj:{type:string,content:string})=>{
        const {type,content} = obj
        switch(type){
          case "text":
            return content
          case "dynamic":
            return data[content]
          case "statement":
            const fn = new Function(...Object.keys(data),content.slice(1))
            return fn(...Object.values(data))
        }
      }).join('')
    }
}
const template = createTemplate(`
    名字： {{ name }}
    {{}}
    年龄： {{ age }}
    {{#
      if (age > 18) {
        return '成年人' 
      } else { 
        return '未成年人' 
      }
    }}
  `);

console.log(template({ name: "张三", age: 14 }));
console.log(template({ name: "李四", age: 19 }));




function render(s: string, data: Record<string, any>) {
  return s.replace(/{{(.*?)}}/gs, (match: string, p1: string) => {
    const expression = p1.trim();
    if (expression === "") {
      return "";
    } else if (expression.startsWith("#")) {
      try {
        if (expression.substring(1).includes("return")){
          const fn = new Function(...Object.keys(data),expression.slice(1))
          return fn(...Object.values(data))
        }else {
          const func = new Function("data", `with(data) { return ${expression.substring(1)}; }`);
          return func(data);
        }
      } catch (error) {
        console.error("Error evaluating expression:", expression, error);
        return "";
      }
    } else {
      return data[expression] !== undefined ? data[expression] : "";
    }
  });
}

// 测试数据
const data = {
  name: "小明",
  age: 16,
  school: "第三中学",
  classroom: "教室2",
};

console.log(
  render(
    "{{ name }} 今年 {{ age }} 岁，就读于 {{ school }} 今天在 {{ classroom }} 上课，{{ name }} {{ #age >= 18 ? '成年了' : '未成年' }}",
    data
  )
);

console.log(
  render(
    `{{ name }}说了句{{#
    if(age >= 18) {
        return "我已经成年了！"
    } else {
        return "我还没有成年！"
    }
  }}`,
    data
  )
);