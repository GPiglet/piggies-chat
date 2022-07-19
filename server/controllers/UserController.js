require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

exports.signup = async (req, res, next) => {
	const {firstname, lastname, email, password} = req.body;

	if ( !firstname || !lastname || !email || !password ) return res.status(400).send("All input is required");
	const oldUser = await UserModel.findOne({ email });
	if (oldUser) {
		return res.status(409).send("User Already Exist. Please Login");
	}

	const user = await UserModel.create({
		firstname,
		lastname,
		email,
		password,
	});

	user._id = null;
	user.password = '';
	res.json(user);	
};

exports.login = async (req, res, next) => {
	const {email, password} = req.body;

	if (!(email && password)) {
		return res.status(400).send("All input is required");
	}
	
	const user = await UserModel.findOne({ email });
	if ( !user ) {
		return res.status(409).send('User not found');
	}

	const validate = await user.isValidPassword(password);
	if (!validate) {
		return res.status(409).send('Wrong Password');
	}

	const body = { _id: user._id, email: user.email };
	const token = jwt.sign({ user: body }, process.env.TOKEN_KEY);

	user.password = '';
	return res.json({ user, token });
}

exports.profile = async (req, res, next) => {
	const {_id, email} = req.user;
	const user = await UserModel.findOne({_id});
	if ( !user ) {
		return res.status(409).send('User not found');
	}

	user.password = '';
	return res.json(user);
}