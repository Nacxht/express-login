const bcrypt = require('bcrypt');

const {getUser} = require('../model/user-model');


const handleLogin = async (data) => {
    // Get user data
    const user = await getUser(data.username);

    // Checking if user is exist
    if (user.length === 0) {
        return {result: false, message: "User Not Found!"};
    } else if (user && !bcrypt.compareSync(data.password, user[0].password)) {
        return {result: false, message: "Your Password Is Wrong!"};
    } else if (user && bcrypt.compareSync(data.password, user[0].password)) {
        return {result: true, user_id: user[0].user_id};
    }
};


module.exports = {
    handleLogin
};