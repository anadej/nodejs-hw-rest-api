const express = require("express");
const { users: ctrl } = require("../../controllers");
const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require("../../middlewares");
const { joiSchema, joiUserVerifySchema } = require("../../models/user");
const router = express.Router();

router.post("/signup", validation(joiSchema), controllerWrapper(ctrl.signup));

router.post("/signin", validation(joiSchema), controllerWrapper(ctrl.signin));

router.get("/signout", authenticate, controllerWrapper(ctrl.signout));

router.get("/current", authenticate, controllerWrapper(ctrl.currentUser));

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(ctrl.updateAvatar)
);

router.get("/verify/:verifyToken", controllerWrapper(ctrl.verify));

router.post(
  "/verify",
  validation(joiUserVerifySchema),
  controllerWrapper(ctrl.repeatVerify)
);

module.exports = router;
