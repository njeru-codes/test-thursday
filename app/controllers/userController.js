const User = require('../models/user')
const {registerSchema} = require('../schemas/userValidator')

const registerNewUser = async (req, res) => {
    try {
      const { error, value } = registerSchema.validate(req.body);

      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email }); // Check if user already exists
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const user = new User({ name, email, password });       // Create a new user
      await user.save();
  
      res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

const getUserById = async (req, res) => {
    
  const userData = req.user
  const userEmail = userData.email

  const userDb = await User.findOne({ email: userEmail});
  if (!userDb) {
    return res.status(404).json({ message: 'User not found' });
  }


  console.log(userData);
    res.json(
        {
            message: 'User fetched successfully',
            user: {
              id: userDb._id,
              name: userDb.name,
              email: userDb.email,
              createdAt: userDb.createdAt,
            }
        }
    )
}

module.exports = {
    registerNewUser,
    getUserById
}