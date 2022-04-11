const { findAll, findFiltered, insert, remove } = require("../controllers/auto");
const express = require("express");
const router = express.Router();

router.get('/', findAll)
router.get('/filtered', findFiltered)
router.post('/', insert)
router.delete('/', remove)

module.exports = router;