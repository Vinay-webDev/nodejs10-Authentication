// to provide authentication we need to have two part (controllers or routes)
// 1. register 
// 2. authorization
//here we are going to do register part****👇
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data}
}
// now we need some common core modules
const fsPromises = require('fs').promises;
const path = require('path');
// now we need to install a dependency called bcrypt which will do hash , salt passwords
//===>> npm i bcrypt
/////////////
const handleNewUsers = async(req, res) => {
    //[1] destructuring 
    //1. so our user requrests is going to have a username and a password
    //2. so now we need to destructure or I say extract the user and pwd***
    const { user, pwd } = req.body;
    //[2] now we need to check for if the user and pwd exist
    if (!user || !pwd) {
        res.sendStatus(400).json({"message":"username and password are required!"});
    }
    //if we are in this step means we already have a user and pwd
    
}
















