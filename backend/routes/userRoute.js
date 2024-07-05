const { Router } = require('express')
const { userModel } = require('../model/userSchema')
const { postModel } = require('../model/postSchema')
const { commentModel } = require('../model/commentSchema')
const { verifyToken } = require('../verifyToken')
const bcrypt = require('bcrypt')
const router = Router()

//update 
router.put('/:id',verifyToken, async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            req.body.password = hashedPassword
        }

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

//delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        await postModel.deleteMany({ userId: req.params.id })
        await commentModel.deleteMany({ userId: req.params.id })

        res.status(200).json("user deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//get
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const { password, ...info } = user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router