const jwt = require('jsonwebtoken');

function genToken(staff){
    const token = jwt.sign({ id: this.id , role: this.role }, 'privatekey');
    return token
}

module.exports = genToken;