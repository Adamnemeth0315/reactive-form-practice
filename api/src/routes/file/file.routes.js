const express = require('express');
const controller = require('./file.controller');

const router = express.Router();

router.post('/', (req, res, next) => controller.uploadFile(req, res, next));

router.delete('/:filename', (req, res, next) => controller.delete(req, res, next));

module.exports = router;