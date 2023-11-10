const logger = require('../startup/logger');


module.exports = function (err, req, res, next) {
    logger.log(err.message, err);
    res.status(500).send('Hata oluştu');
}