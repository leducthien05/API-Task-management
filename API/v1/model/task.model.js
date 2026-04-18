const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: String,
        status: String,
        content: String,
        timeStart: Date,
        timeFinish: Date,
        createdBy: String,
        listUser: Array,
        deleted: {
            type: Boolean,
            defautl: false
        },
        deletedAt: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true,
    }
);

const Task = mongoose.model("Task", taskSchema, "tasks");
module.exports = Task;