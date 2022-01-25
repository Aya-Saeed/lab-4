//this is the admin
const admin=(req,res,next)=>{
    if (!req.user.isAdmin){
        return res.status(403).json({message:"you are not admin"})
    }
    next();
}
module.exports = admin