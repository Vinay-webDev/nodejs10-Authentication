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
const bcrypt = require('bcrypt');
// now we need to install a dependency called bcrypt which will do hash , salt passwords
//===>> npm i bcrypt
/////////////
const handleNewUser = async(req, res) => {
    //[1] destructuring 
    //1. so our user requrests is going to have a username and a password
    //2. so now we need to destructure or I say extract the user and pwd***
    const { user, pwd } = req.body;
    //[2] now we need to check for if the user and pwd exist
    if (!user || !pwd) {
        res.status(400).json({"message":"username and password are required!"});
    }
    //if we are in this step means we already have a user and pwd
    //[3] we need to check for the duplicate username in DB (database);
    const duplicate = usersDB.users.find( u => u.username === user);
    //[4] if there is duplicate user then response would be (409) 
    if (duplicate) return res.sendStatus(409) // 409 means conflict***
    //[5] try and catch block
    try {
        //[7] encrypt the pwd ==>> now we need to hash and salt with bcrypt 
        const hashedPwd = await bcrypt.hash(pwd, 10) // 10 salt round which is default;
        //[8] we need to store newUsers in DB
        const newUser = {"username":user, "password":hashedPwd};
        usersDB.setUsers([...usersDB.users, newUser]); // also we need to have the old users and new users combined***
        //[9] need to write to a file as well ***
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json' ), JSON.stringify(usersDB.users));
        //aslo we need to log it to the console to cross check
        console.log(usersDB.users);
        res.status(201).json({"success":`new user${user} created!`});
    } catch(err) {
        //[6] let's handle the error part 
        res.status(500).json({"message":err.message}); // 500 means server error!
    }
}


module.exports = { handleNewUser };













