const { Router } = require("express");
const router = Router();
const { userModel } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.find({ username: username })
        const tempEmail = await userModel.find({ email: email })

        if (user.length) {
            return res.status(401).json('username already exist')
        }

        if (tempEmail.length) {
            return res.status(401).json('email already exists')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//login
router.post("/login", async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json("User Not Found");
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(401).json("Worng credentials !");
        }

        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email }, "SECRET", { expiresIn: "1d" });
        const { password, ...info } = user._doc;
        res.cookie("token", token).status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
});

//logout
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: "none", secure: true }).status(200).send("user Logged Out")
    } catch (error) {
        res.status(500).json(error)
    }
})

//refetch user
router.get('/refetch', async (req, res) => {
    const token = req.cookies.token
    jwt.verify(token, "SECRET", {}, async (err, data) => {
        if (err) {
            return res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})

module.exports = router;
