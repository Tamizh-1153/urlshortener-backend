const express = require("express")
const router = express.Router()

const {createShortUrl, getShortUrl, goToUrl}=require('../controllers/shortUrl')

router.route('/shortUrl').post(createShortUrl).get(getShortUrl)
router.route('/:shortUrl').get(goToUrl)





module.exports = router