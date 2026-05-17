const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
   userID: {
      type: String,
      required: true
   },
   email: {
      type: String,
      require: true
   },
   refreshToken: {
      type: String,
      required: true,
      unique: true
   },
   expireAt: {
      type: Date,
      expires: 0
   }
}, {
   timestamps: true
});
const Session = mongoose.model('Session', tokenSchema, 'session');
module.exports = Session;