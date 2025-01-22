const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // 86400 seconds = 24 hours
});

module.exports = mongoose.model("BlacklistToken", blacklistTokenSchema);
