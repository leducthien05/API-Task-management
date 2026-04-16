const Task = require("../model/task.model");

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
    const task = await Task.find(find).sort(sort);
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