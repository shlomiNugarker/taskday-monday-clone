const fs = require('fs')


// CRUDL : CREATE, READ, UPDATE, DELETE, LIST

const gUsers = require('../data/user.json')

const PAGE_SIZE = 3

// function countBugs(){

// }

function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    if (!user) return Promise.reject('No Such User')
    return Promise.resolve(user)
}

function checkLogin(username, password) {
    var user = gUsers.find(user => user.username === username && user.password === password)
    if (!user) return Promise.reject('Invalid Credentials')

    user = {...user }
    delete user.password
    return Promise.resolve(user)
}


function save(newUserRequest) {
    const userToSave = {
        _id: _makeId(),
        fullname: newUserRequest.fullname,
        username: newUserRequest.username,
        password: newUserRequest.password,
        createdAt: Date.now(),
        isAdmin: newUserRequest.isAdmin || false
    }
    gUsers.unshift(userToSave)
    return _saveUsersToFile().then(() => {
        const user = {...userToSave }
        delete user.password
        return user
    })
}


function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) return reject(err)
            resolve();
        })
    })
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

module.exports = {
    checkLogin,
    getById,
    save
    // countBugs
}