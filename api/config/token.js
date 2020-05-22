exports.token= function(token) {
    if(token != '123'){
        console.log('#negado! tentativa de acesso não autorizado!')
        return false
    }else{
        return true
    }
};