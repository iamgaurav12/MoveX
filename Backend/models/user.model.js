const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"], // fixed typo
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"], // fixed typo
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be at least 5 characters"], // fixed typo
  },
  password: {
    type: String,
    required: true,
    select: false, //agar koi user ko dhund rha toh password uskey sath nhi jana chahiyen
    // No minLenght because we use JWT token for it
  },
  socketId: {
    type: String,
    // for sharing location b/w cab driver and user
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
