const { Router } = require('express')
const { postModel } = require('../model/postSchema')
const { commentModel } = require('../model/commentSchema')
const router = Router()
const { verifyToken } = require('../verifyToken')


//create
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newPost = req.body
        const savedPost = await postModel.create(newPost)
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const newPost = await postModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
})


//delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await postModel.findByIdAndDelete(req.params.id)
        await commentModel.deleteMany({ postId: req.params.id })
        res.status(200).json("post deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})


//get post details
router.get('/:id', async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)

    }
})

//get all posts
router.get('/', async (req, res) => {
    const query = req.query
    try {
        const searchFilter = {
            title: { $regex: query.search, $options: 'i' }
        }
        const posts = await postModel.find(query.search ? searchFilter : null)
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)

    }
})

//get user posts
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await postModel.find({ userId: req.params.userId })
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)

    }
})


module.exports = router