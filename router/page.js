/**
 * Created by Ludin Nento on 08/05/2017.
 */
var express = require('express');
var path = require('path');
var router = express.Router();

// serve angular front end files from root path
router.use('/', express.static('dist', { redirect: false }));
// rewrite virtual urls to angular app to enable refreshing of internal pages
router.get('*', function (req, res, next) {
    res.sendFile(path.resolve('dist/index.html'));
});

module.exports = router;