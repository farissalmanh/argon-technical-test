let jwt = require('jsonwebtoken');
const JWTKEY = process.env.JWT_SECRET;

function sign(data){
	const accessToken = jwt.sign(
		data,
		JWTKEY,
		{ expiresIn: '1h' },
	);
	return accessToken;
}

function validateToken(token) {
	let options = {};

	return jwt.verify(token, JWTKEY, options, (err, decoded) => {
		if (err) {
			console.log(err, 'Token Not Valid');
			return false;
		} else {
			let payload = decoded;
			delete payload.iat;
			delete payload.exp;
			payload.authenticated = true;

			return payload;
		}
	});
}

module.exports = { sign, validateToken };
