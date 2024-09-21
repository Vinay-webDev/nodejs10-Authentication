// so this basically similar to register
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
// here we just need bcrypt
const bcrypt = require('bcrypt');


// Let's create a handle
const handleLogin = async(req, res) => {
    //[1] same steps upto res.sendStatus(400)
    const { user, pwd } = req.body;
    if (!user || !pwd ) {
        res.sendStatus(400).json({"message":"username and password are required!"});
    }
    //[2]check to see if the username exist
    const foundUser = usersDB.users.find(u => u.username === user);
    //[3] if we don't have a user then res👇
    if (!foundUser) return res.sendStatus(401); // 401 means unauthorize!
    //[4] at this step means we have a user
    // Let's try to check if the password matches // here the bcrypt comes in 
    const match = await bcrypt.compare(pwd, foundUser.password);
    //[5] check there is match or not 
    if (match) {
        res.json({"success":`User${user} is logged in!`});
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };










