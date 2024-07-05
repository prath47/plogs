const { Router } = require('express')
const { commentModel } = require('../model/commentSchema')
const router = Router()
const { verifyToken } = require('../verifyToken')

//create
router.post('/create', verifyToken , async (req, res) => {
    try {
        const newComment = req.body
        const savedComment = await commentModel.create(newComment)
        res.status(200).json(savedComment)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const newComment = await commentModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await commentModel.findByIdAndDelete(req.params.id)
        res.status(200).json("Comment deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})



//get post Comments
router.get('/post/:postId', async (req, res) => {
    try {
        const Comments = await commentModel.find({ postId: req.params.postId })
        res.status(200).json(Comments)
    } catch (error) {
        res.status(500).json(error)

    }
})

module.exports = router