const Joi = require("joi");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setDefaultAvatar = function (avatar) {
  this.avatarURL = avatar;
};

const { SECRET_KEY } = process.env;

userSchema.methods.createToken = function () {
  const payload = {
    id: this._id,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

const joiSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "cz"] },
    })
    .required(),
  password: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  joiSchema,
};
