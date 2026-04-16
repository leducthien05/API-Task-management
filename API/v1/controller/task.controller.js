const Task = require("../model/task.model");

const helperPagination = require("../../../helper/pagination");
const helperSearch = require("../../../helper/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    };
    if(req.query.status){
        find.status = req.query.status;
    }
    // Sắp xếp theo tiêu chí
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // Phân trang
    const countRecord = await Task.countDocuments(find);
    const objectPagination = helperPagination.pagination(req.query, countRecord);
    // Tìm kiếm
    const search = helperSearch.search(req.query);
    if(req.query.keyword){
        find.title = search.regex;
    }
    const task = await Task.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skipRecord);
    res.json(task);
};
// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res)=>{
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    console.log(task);
    res.json(task);
};