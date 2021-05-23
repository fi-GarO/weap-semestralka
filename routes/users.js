var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



/*router.post('/signup', (req, res, next) => {
		User.find({email: req.body.email})
			.exec()
			.then(users => {
				if (user.length >= 1) {
					return res.status(409).json({		// 409 = conflict
						message: 'Mail exists'
					});
				} else {
					bcrypt.hash(req.body.password, 10, (err, hash) => {	// salt - 10 - přidání random Stringů do hashe
			if (err) {
				return res.status(500).json({
					error: err
				});
			} else {
				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					username: req.body.username,
					password: hash
				});

				user
				.save()
				.then(result => {
					res.status(201).json({
						message: 'User created'
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						error: err
					});
				});
			}
		});

				}
			})
			
		
	});

router.post('/login', (req, res, next) =>{
	User.find({username: req.body.username})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(404).json({
					message: 'Auth failed'
				});
			}
				bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
					if (err) {
							return res.status(401).json ({
								message: 'Auth failed'
							});
					}
					if (result) {
						const token = jwt.sign(
						{
							username: user[0].username,
							userId: user[0]._id
						},	
						process.env.JWT_KEY, 
						{
							expiresIn: "1h"
						});
						return res.status(200).json({
							message: 'Auth successful',
							token: token
						});

					}
				});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});

router.delete('/:userId', (req, res, next) => {
	User.remove({_id: req.params.userId})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User deleted'
			})
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			});
		});
});
*/
module.exports = router;
