const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.tokenCheck = (req,res,next)=>{
    const token = req.headers.authorization;
    // console.log(token);
    if(token){
        jwt.verify(token, process.env.SECREAT_KEY, function(err, decoded) {
            if(err){
                console.log(err);
            }
            else{
                const {email}=(decoded);
                client.query(`select * from users where email = '${email}';`)
                .then((data)=>{
                    if(data.rows.length===0){
                        res.status(400).json({
                            msg:"Invalid token"
                        })
                    }
                    else
                    {
                        req.email = email;
                        next();
                    }
                })
            }
          });
        }
    else{
        res.status(500).json({
            msg:"middleware server error"
        })
    }
}