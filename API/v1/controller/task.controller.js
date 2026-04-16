const Task = require("../model/task.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res)=>{
    const find = {
        deleted: false
    };
    if(req.query.status){
        find.status = req.query.status;
    }
    const task = await Task.find(find);
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