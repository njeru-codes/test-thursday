const Comment = require("../models/comment");
const commentSchema = require('../schemas/commentValidator');

const postUserComment = async (req, res) => {
    try {
        const userData = req.user;
        const email = userData.email;

        // Validate request body
        const { error } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { comment } = req.body;

        // Create a new comment
        const newComment = new Comment({
            user: email, 
            text: comment, 
            createdAt: Date.now() // ✅ Correct way to set the date
        });

        await newComment.save();

        res.status(201).json({
            message: 'User commented on a post successfully',
            comment: newComment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserComments = async (req, res) => {
    try {
        const userEmail = req.user.email; 
        const comments = await Comment.find({ user: userEmail });

        res.status(200).json({
            message: 'User fetched their comments successfully',
            comments: comments
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    postUserComment,
    getUserComments

}