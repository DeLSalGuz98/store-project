const jwt = require('jsonwebtoken');

const genToken = (id_user)=>{
    const token = jwt.sign({id: id_user}, process.env.NODE_SECRET_WORD,{
        expiresIn: 60*60*24
    });
    return token
}
module.exports = genToken;