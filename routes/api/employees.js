const express = require("express");
const router = express.Router();
const employeesController = require("../../controller/employeesController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES.Admin, ROLES.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES.Admin, ROLES.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES.Admin), employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
