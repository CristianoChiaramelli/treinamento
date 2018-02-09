/**
 * OrderedProducts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	userid: {
  		required: true,
  		type: 'integer',
  	},
  	productid: {
  		required: true,
  		type: 'integer',
  	},
  	quantity: {
  		required: true,
  		type: 'integer',
  	},
  }
};