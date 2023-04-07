const express = express();
const userRoutes = express.Router();

userRoutes.get("/",async(req,res)=>{
    try{
        const user  = await userModel.find();
        res.status(200).send({
            msg:user,
            status:"success"
        })
    }
    catch(e){
      res.status(400).send({
        msg:e.message
      })
    }
});

