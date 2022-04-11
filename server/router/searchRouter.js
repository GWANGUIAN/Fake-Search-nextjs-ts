const { getSeachList, getSearch, insert, update, remove } = require("../controllers/search");
const express = require("express");
const router = express.Router();

router.get('/', getSeachList)
router.get('/word', getSearch)
router.post('/', insert)
router.patch('/', update)
router.delete('/', remove)

module.exports = router;