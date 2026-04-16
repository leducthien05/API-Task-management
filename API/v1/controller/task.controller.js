const Task = require("../model/task.model");

const helperPagination = require("../../../helper/pagination");
const helperSearch = require("../../../helper/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    }
    // Sắp xếp theo tiêu chí
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    // Phân trang
    const countRecord = await Task.countDocuments(find);
    const objectPagination = helperPagination.pagination(req.query, countRecord);
    // Tìm kiếm
    const search = helperSearch.search(req.query);
    if (req.query.keyword) {
        find.title = search.regex;
    }
    const task = await Task.find(find).sort(sort).limit(objectPagination.limit).skip(objectPagination.skipRecord);
    res.json(task);
};
// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const task = await Task.findOne({
        _id: id,
        deleted: false
    });
    console.log(task);
    res.json(task);
};
// [PATCH] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    try {
        await Task.updateOne({
            _id: id,
            deleted: false
        }, {
            $set: {
                status: status
            }
        });
        res.json({
            code: 200,
            message: "Cập nhật thành công"
        });
    } catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật thất bại"
        });
    }
};
// [PATCH] /api/v1/tasks/change-multi-status
module.exports.changeMultiStatus = async (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    const key = req.body.key;
    try {
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: id },
                    deleted: false
                }, {
                    $set: {
                        key: status
                    }
                });
                res.json({
                    code: 200,
                    message: "Cập nhật thành công"
                });
                break;
            default: 
                res.json({
                    code: 400,
                    message: "Không tồn tại key"
                });
                break;
        }

    } catch (error) {
        res.json({
            code: 100,
            message: "Cập nhật thất bại"
        });
    }
};
// [POST] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.json({
            code: 200,
            message: "Thêm mới thành công",
            data: task
        });

    } catch (error) {
        res.json({
            code: 100,
            message: "Thêm mới thất bại"
        });
    }
};
// [PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        await Task.updateOne({
            _id: id
        }, req.body);
        res.json({
            code: 200,
            message: "Chỉnh sửa thành công"
        });

    } catch (error) {
        res.json({
            code: 100,
            message: "Thêm mới thất bại"
        });
    }
};