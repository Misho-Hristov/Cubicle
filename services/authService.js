const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../config/config');
const jwt = require('jsonwebtoken');


const register = async({ username, password }) => {
    // console.log(SALT_ROUNDS);
    ///TO Do if such username exists
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);


    const user = new User({ username, password: hash });
    return await user.save();
}

const login = async({ username, password }) => {
    //get user from db
    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found!' };
    //compare pass hash
    let isMathced = await bcrypt.compare(password, user.password);

    if (!isMathced) throw { message: 'Password does not match!' };
    // console.log(isMathced);

    //generate token
    let token = jwt.sign({ _id: user._id, roles: ['admin'] }, SECRET);
    return token;
}

module.exports = {
    register,
    login
}