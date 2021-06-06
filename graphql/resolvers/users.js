const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(input) {
    return jwt.sign(
        {
            id: input.id,
            email: input.email,
            username: input.username
        }, 
        SECRET_KEY, { expiresIn:'1h' }
    );
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            const user = await User.findOne({ username });

            if(!valid) {
                throw new UserInputError('All fields are required!', { errors });
            }

            if(!user) {
                errors.general = 'User is not found!';
                throw new UserInputError('User is not found!', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Password is wrong!';
                throw new UserInputError('Password is wrong!', { errors });
            }

            const token = generateToken(user);
            return { 
                ...user._doc, 
                id: user._id, 
                token 
            };
        },
        async register(
                _, 
                { 
                    registerInput: { username, email, password, confirmPassword } 
                }
            ) {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // TODO: Make sure user doesn't exist
            const user = await User.findOne({ username });
            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: `The ${username} username has already taken`
                    }
                });
            }

            // Hash the password, and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = generateToken(res);
            return {
                ...res._doc,
                id: res._id,
                token
            };
        }
    }
};