const express = require("express");

const {
  validation,
  controllerWrapper,
  authenticate,
} = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", authenticate, controllerWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.put(
  "/:contactId",
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch("/:contactId", authenticate, controllerWrapper(ctrl.updateStatus));

router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

module.exports = router;
