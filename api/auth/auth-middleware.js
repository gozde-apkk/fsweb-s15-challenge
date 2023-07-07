const userModel = require("../users/user-model");
const bcrypt = require('bcryptjs')

const userNameVarMi = async(req,res,next) =>{
    const {username} =req.body
    const user = await userModel.getByFilter({username: username})

    if(!user){
        res.status(401).json({message:"Geçersiz kriter"}) 
    }else{
      req.user = user
      next();
    }
}


async function usernameBostami(req,res,next) {
    try{
     const {username, password} = req.body;
     const user = await userModel.getByFilter({username: req.user.username})
     if(user){
       res.status(422).json({message:"Username kullaniliyor"})
     }else{
      const hashedPassword =  bcrypt.hashSync(user.password, 8);
      req.hashedPassword = hashedPassword;
       next();
     }
   }catch(error){
     next(error);  
   }
}

module.exports={
    userNameVarMi,usernameBostami,
}