const express = require('express');

const router = express.Router();

const burgers = require('../model/burger.js');


router.get('/', function (req, res) {
	burgers.selectAll(
		function (data) {
			console.log('"/" call Burgers object:', data);
			res.render("index", { burgers: data });
		}
	);
});

router.post('/api/burgers', function(req, res) {
	burgers.insertOne(
		["burger_name"],
		[req.body.burger_name],
		function (result) {
			res.json({ id: result.insertId});
		}
	);
});

router.put("/api/burgers/:id", function (req, res) {
	let condition = `id = ${req.params.id}`;

	console.log("Eating burger with ID of ", condition);

	burgers.updateOne(
		{devoured: req.body.devoured},
		condition,
		function (result) {
			if (result.changedRows == 0) {
				return res.status(404).end();
			} else {
				res.status(200).end();
			}
		}
	);
});

router.delete("/api/burgers/:id", function (req, res) {
	let condition = `id = ${req.params.id}`;

	console.log("Deleting burger with ID of ", condition);

	burgers.deleteOne(condition, function (result) {
		if (result.affectedRows == 0) {
	      return res.status(404).end();
	    } else {
	      res.status(200).end();
	    } 
	});
});


module.exports = router;
