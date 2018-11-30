var express =  require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send("Selamat Datang WEB API")

});

module.exports = router;