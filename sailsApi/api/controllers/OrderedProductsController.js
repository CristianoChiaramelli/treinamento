/**
 * OrderedProductsController
 *
 * @description :: Server-side logic for managing orderedproducts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getProductsList: (req, res) => {

		const userid = req.param('userid');

		const myQuery = 'SELECT * FROM ORDEREDPRODUCTS JOIN PRODUCTS ON PRODUCTS.ID=ORDEREDPRODUCTS.PRODUCTID AND USERID='+userid+';';
		OrderedProducts.query(myQuery, (err, queryRes) => {
			if (err){
				console.log('Error', err);
				res.send(400);
			} else {
				const raw = queryRes.rows

				console.log(raw);

				res.send(raw);
			}
		})
	},

	addProduct: (req, res) => {

		const {userid, productid, quantity} = req.body;

		const myQuery = `INSERT INTO orderedproducts VALUES (${userid}, ${productid}, ${quantity});`;
		
		OrderedProducts.query(myQuery, (err, queryRes) => {
			const userRaw = queryRes.rows[0];

			if (err){
				console.log('Error', err);
				res.send(400);			
			} else {
				res.send(true);
			}
		})
	}
};