
module.exports = {
	processLogin: (req, res) => {

		const email = req.body.email;
		const password = req.body.password;
		const myQuery = `SELECT * FROM USERS WHERE USERS.EMAIL='${email}' AND USERS.PASSWORD='${password}';`;
		
		console.log(myQuery);

		Users.query(myQuery, (err, queryRes) => {
			if (err){
				console.log('Error', err);
				res.send(400);
			} else {
				const userRaw = queryRes.rows[0];

				if (userRaw){
					const userInfo = {
						id: userRaw.id,
						name: userRaw.name
					}
					console.log('Login OK', userInfo.name);
					res.send(userInfo);
				} else {
					console.log('Usuario nao encontrado', email);
					res.send({name: null});
				}
			}
		})
	},

	updateUser: (req, res) => {
		const id = req.body.id;
		const name = req.body.name;
		const email = req.body.email;
		const password = req.body.password;

		const myQuery = `UPDATE users SET name='${name}', email='${email}' ${password?`,password='${password}' `:``}WHERE users.id='${id}';`

		console.log(myQuery);
		Users.query(myQuery, (err, queryRes) => {
			if (err){
				console.log('Error', err);
				res.send(400);
			} else {
				res.send(true);
			}
		})
	}
};