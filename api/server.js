// BUILD YOUR SERVER HERE
const express = require("express")
const User = require("./users/model.js")

const server = express()

server.use(express.json())

server.get('/api/users', (req, res) => {
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })

})

server.get("/api/users/:id", (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json("user not found")
            }
            else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})


server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name || !newUser.bio) {
        res.status(422).json("enter name and bio por favor")
    }
    else {
        User.insert(newUser)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
})

server.put("/api/users/:id", async (req, res) => {
    const changes = req.body
    const { id } = req.params
    try {
        if (!changes.name || !changes.bio) {
            res.status(422).json("name and bio are both required")
        }
        else {
            const updatedUser = await User.update(id, changes)
            if (!updatedUser) {
                res.status(422).json("user doesnt exist")
            }
            else {
                res.status(201).json(updatedUser)
            }
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }


})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await User.remove(id)
        if (!deletedUser) {
            res.status(422).json("user doesnt exist boi")
        }
        else {
            res.status(201).json(deletedUser)
        }

    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }


})
server.use("*", (req, res) => {
    req.statusCode(200).json({ message: "hello there" })
})
module.exports = server; // EXPORT YOUR SERVER instead of {}
