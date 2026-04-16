module.exports.pagination = (query, count)=>{
    const objectPage = {
        curentPage: 1,
        limit: 2
    }
    if(query.page){
        objectPage.curentPage = parseInt(query.page);
    }
    if(query.limit && query.page){
        objectPage.limit = parseInt(query.limit);
    }
    objectPage.skipRecord = (objectPage.curentPage - 1) * objectPage.limit;
    objectPage.totalPage = Math.ceil(count/objectPage.limit);

    return objectPage;
}