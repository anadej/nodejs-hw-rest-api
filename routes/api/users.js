const express = require("express");
const { users: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/signin", validation(joiSchema), controllerWrapper(ctrl.signin));

router.get("/signout", authenticate, controllerWrapper(ctrl.signout));

router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

module.exports = router;
