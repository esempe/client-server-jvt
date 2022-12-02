const jwt = require("jsonwebtoken")
const tokenModel = require('../models/token-model')

/*        const accessToken = await new Promise((resolve, reject)=>{
            jwt.sign(payload,'11111111',{expiresIn:'30m'},(err,token)=>{
                if(err){
                    reject(err)
                }
                resolve(token)
            })
        })*/

class TokenService {
   generateTokens(payload) { //process.env.JWT_ACCES_SECRET
        const accessToken =  jwt.sign(payload,process.env.JWT_ACCES_SECRET,{expiresIn:'30m'})
        const refreshToken = jwt.sign(payload ,process.env.JWT_REFRESH_SECRET, {expiresIn:'30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        console.log("userId: ",userId)

        const tokenData = await tokenModel.findOne({user:userId})
        console.log("founded token: ", tokenData)
        if(tokenData) {
            console.log('in return of tokenData')
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        console.log("refreshToken: ",{user:userId, refreshToken})
        const token = await tokenModel.create({user:userId, refreshToken})
        console.log("token: ",token)
        return token
    }
}



module.exports = new TokenService()