const express = require('express');

const router = express.Router();

const db = require('../models/');


router.get("/", function(req, res) {
	res.redirect("/burger-time")
});

// Get all burger entries
router.get("/burger-time", function (req, res) {
	db.burgers.findAll({})
		.then(function (data) {
			var allBurgers = [];
			for (var i = 0; i < data.length; i++) {
				allBurgers.push(data[i].dataValues);		
			}
			res.render("index", { burgers: allBurgers });
		});
});

// Post a new burger
router.post("/api/burgers", function(req, res) {
	db.burgers.create({
		burger_name: req.body.burger_name,
	}).then(function(data) {
		res.redirect("/");
	});
});

// Update a burger's devoured state
router.put("/api/burgers/:id", function (req, res) {
	db.burgers.update(
		{
			devoured: req.body.devoured
		},
		{
			where: {
				id: req.params.id
			}
		}
	).then(function(data) {
		res.json(data);
	});
});

// Delete a specific burger
router.delete("/api/burgers/:id", function (req, res) {
	db.burgers.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(data) {
		res.json(data);
	});
});


module.exports = router;
