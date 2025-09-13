const data = [
    {
        id: '1',
        name: '父节点1',
        children: [
            {
                id: '1-1',
                name: '子节点1-1',
                children: [
                    {
                        id: '1-1-1',
                        name: '子节点1-1-1'
                    },
                    {
                        id: '1-1-2',
                        name: '子节点1-1-2'
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        name: '父节点2',
        children: [
            {
                id: '2-1',
                name: '子节点2-1'
            }
        ]
    }
]

function tree2List(treeList) {
    const list = []

    function trans(treeNode,pid){
        treeNode.forEach(element => {
            if (element.children) {
                trans(element.children,element.id)
                delete element.children
            }
            if (pid) element.pid = pid;
            else element.pid = undefined
            list.push(element)
        });
    }

    trans(treeList)
    return list
}


function list2Tree(treeList) {
    console.log(treeList);
    const ans = []
    const root = treeList.filter(item => item.pid == null)
    function dfs(node) {
        console.log("进入dfs",node);
        
        if (treeList.filter(item => item.pid == node.id).length == 0) {
            return 
        }
        const children = []
        treeList.filter(item => item.pid == node.id).forEach(e => {  
            children.push({
                id: e.id,
                name: e.name,
                pid: e.pid,
                children:dfs(e)
            })
        })
        console.log("e",node,"child",children);
        
        return children
    }
    root.forEach(e => {
        ans.push({
                id: e.id,
                name: e.name,
                children:dfs(e)
        })
    })
    
    return ans
}
console.log(JSON.stringify((list2Tree(tree2List(data)))))