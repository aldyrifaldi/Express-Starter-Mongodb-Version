exports.only = (obj,attr) => {
    let result = {}
    let no = 0
    
    attr.forEach(function(index,value){
        result[`${index}`] = obj[index]
    })

    return result
}

exports.except = (obj,attr) => {
    var req = {...obj}
    attr.forEach(function(value){
        delete req[value]
    })
    return req
}