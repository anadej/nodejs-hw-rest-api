const express = require("express");

const { validation, controllerWrapper } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", controllerWrapper(ctrl.getAll));

router.get("/:contactId", controllerWrapper(ctrl.getById));

router.post("/", validation(joiSchema), controllerWrapper(ctrl.add));

router.put(
  "/:contactId",
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch("/:contactId", controllerWrapper(ctrl.updateStatus));

router.delete("/:contactId", controllerWrapper(ctrl.removeById));

module.exports = router;
