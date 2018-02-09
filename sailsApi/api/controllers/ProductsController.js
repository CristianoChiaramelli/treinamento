/**
 * ProductsController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getProductsList: (err, res) => {

		const myQuery = 'SELECT * FROM PRODUCTS;';
		Products.query(myQuery, (err, queryRes) => {
			if (err){
				console.log('Error', err);
				res.send(400);
			} else {
				const raw = queryRes.rows

				console.log(raw);

				res.send(raw);
			}
		})
	}
};

