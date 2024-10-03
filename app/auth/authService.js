const User = require("../user/schemas/schema")
const { sendSuccessResponse, sendErrorResponse } = require("../../utils/response");
const { generateToken } = require("../../utils/jwt");
const { comparePassword } = require("../../utils/bcrypt");



const signup = async (req, res) => {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        email,
        password: hashedPassword,
        name,
    });

    return await newUser.save();
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return sendErrorResponse(res, "Invalid email or password", 401);
        }

        // Verify the password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return sendErrorResponse(res, "Invalid email or password", 401);
        }

        const token = generateToken(user);
        sendSuccessResponse(res, "Login successful", {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        });
    } catch (error) {
        sendErrorResponse(res, "Error logging in", 500);
    }
};


module.exports = { signup, loginUser }