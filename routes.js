var ApiActions = require("./action.js");

var ApiRoutes = function (app) {
    this.app = app;
    this.userActionInstance = new ApiActions(app);
};
module.exports = ApiRoutes;


ApiRoutes.prototype.init = function (app) {

    var self = this;
    var app = self.app;


    app.get('/', function (req, res) {
        res.send({'test': 'Ok'})
    });

    app.post('/v1/create/product', function (req, res) {
        self.userActionInstance.productCreation(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/create/product ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler for /v1/create/product " + e);
                res.send(e.message);
            });

    });
    app.post('/v1/delete/product', function (req, res) {
        self.userActionInstance.productDeleteAction(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/delete/product ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler for /v1/delete/product" + e);
                res.send(e.message);
            });

    });
    app.put('/v1/update/product', function (req, res) {
        self.userActionInstance.updateProduct(req, res)
            .then(function (finalResult) {

                console.log("Final response for /v1/update/product ", finalResult);

                res.send(finalResult);
            })

            .catch(function (e) {
                console.log("Catch handler for /v1/update/product" + e);
                res.send(e.message);
            });

    });
    app.get('/v1/product/create/activation', function (req, res) {
        self.userActionInstance.productCreateActivation(req,res)
            .then(function(finalResult){

                console.log("Final response for /v1/product/create/activation",finalResult);

                res.send(finalResult);
            })

            .catch(function(e){console.log("Catch handler for /v1/product/create/activation" + e);
                res.send(e.message);
            });

    });
    app.get('/v1/product/update/activation', function (req, res) {
        self.userActionInstance.productUpdateActivation(req,res)
            .then(function(finalResult){

                console.log("Final response for /v1/product/update/activation",finalResult);

                res.send(finalResult);
            })

            .catch(function(e){console.log("Catch handler for /v1/product/update/activation" + e);
                res.send(e.message);
            });

    });
    app.get('/v1/product/delete/activation', function (req, res) {
        self.userActionInstance.productDeleteActivation(req,res)
            .then(function(finalResult){

                console.log("Final response for /v1/product/delete/activation",finalResult);

                res.send(finalResult);
            })

            .catch(function(e){console.log("Catch handler for /v1/product/delete/activation" + e);
                res.send(e.message);
            });

    });

}