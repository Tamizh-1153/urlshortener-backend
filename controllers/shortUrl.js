const ShortUrl=require('../models/shortUrl')


const createShortUrl=async(req,res)=>{
    console.log(req.body)
    req.body.user=req.user.email
    console.log(req.body)
    const shortUrl=await ShortUrl.create({...req.body})
    res.json({message:'short url created',shortUrl})
}

const getShortUrl=async(req,res)=>{
    const {email}=req.user

    const shortUrls=await ShortUrl.find({user:email})
    res.json({message:'short url received',shortUrls})
}

const goToUrl=async(req,res)=>{
    const {shortUrl}=req.params
    const { email } = req.user
    
    const url=await ShortUrl.findOne({user:email,shortUrl:shortUrl})
    url.views++
    await url.save()
    res.json(url.url)
}


module.exports={
    createShortUrl,
    getShortUrl,
    goToUrl
}