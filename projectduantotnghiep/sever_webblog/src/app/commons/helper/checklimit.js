const limit = (req, res, next) =>{
    const limit = req.query.limit;
    if(limit === '' || limit === undefined){
        req.limit = 5;
        return next();
    }else{
        req.limit = limit;
        return next();
    }
}

export const serviceFind = {limit};