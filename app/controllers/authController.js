const User = require('../models/user');
const { generateToken } = require('../utils/jwtUtils'); // Ensure correct import
const { verifyPassword } = require('../utils/passwordUtils'); // Ensure correct import
const { loginSchema } = require('../schemas/userValidator'); // Ensure correct import

const authUser = async (req, res) => {
    try {
        // Validate request body
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = value; // Use validated input

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Verify password using utility function
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create user payload for token
        const user_data = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        // Generate JWT token
        const token = generateToken(user_data);

        res.status(200).json({
            message: 'User authenticated successfully',
            token: token,
            type: 'Bearer'
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout function (JWT-based auth does not require backend logout)
const logoutUser = (req, res) => {
    res.status(200).json({ message: 'User logged out successfully' });
};

module.exports = {
    authUser,
    logoutUser
};
