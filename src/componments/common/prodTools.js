let ProdTools = {};
let store = window.localStorage;
let prods = JSON.parse(store.getItem('prod') || '{}');    

//增加或者追加
ProdTools.addOrUpdate = function(p) {
    if(prods[p.id]){
        prods[prods.id] += p.pickNum;
    }else{
        prods[p.id] = p.pickNum;
    }
    this.saveProd(prods);
}

ProdTools.reMoveOrUpdate = function(p) {
    delete prods[id];
    this.saveProd(prods);
}

//获取
ProdTools.getProds = function(){
    return JSON.parse(store.getItem('prod') || '{}');
}

ProdTools.getCount = function(){
    for(let key in prods){
        sum += prods[key]
    }
    return sum;
}

//数据序列化 持久化 存储
ProdTools.saveProd = function(prods){
    store.setItem('prods', prods);
}


export default ProdTools;
