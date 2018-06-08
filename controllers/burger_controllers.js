// Inside the burgers_controller.js file, import the following:
// Express
// burger.js
// Create the router for the app, and export the router at the end of your file.

// require express
var express = require("express");

// create route for the app
var router = express.Router();

var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "name", " devoured"
    ], [
            req.body.name, req.body.devoured
        ], function (result) {
            // Send back the ID of the new quote
            res.json({ id: result.insertId });
        });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changeRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();

        } else {
            return res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.delete(condition, function (result) {
        if (result) {

            return res.status(200).end();

        } else {
            return res.status(404).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;