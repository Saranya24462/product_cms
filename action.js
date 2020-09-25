var UserService = require("./services.js");
var rp = require('request-promise');
var Promise = require('bluebird');

var ApiActions = function (app) {
    this.app = app;
    this.conf=app.conf;
    this.userServiceInstance = new UserService(app);
};
module.exports = ApiActions;


ApiActions.prototype.init = function () {


}
ApiActions.prototype.productCreation = function (req, res) {
    var self = this;
    var input = req.body;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {
            return self.userServiceInstance.findAdmin(input)
                .then(function (responseData) {

                    var userData = JSON.parse(JSON.stringify(responseData))

                    if (userData.role === 'SuperAdmin') {
                        console.log("User is Super Admin so create Product")
                        return self.userServiceInstance.insertProduct(input)

                            .then(function (result) {
                                if (result != null) {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Product Created Successfully";
                                    resolve(response)
                                } else {
                                    response['data']['message'] = "Product Not Created ";
                                    resolve(response)
                                }

                            })

                    } else {
                        console.log("The person is not Super Admin so send mail to Super Admin")
                        var data = {
                            email: userData.email,
                            productName: input.productName,
                            productDesc: input.productDesc,
                            productPrice: input.productPrice,
                            // productSpec: input.productSpec,
                            username: input.username
                        }

                        var action = self.conf.productCreateMailsentUrl;
                        var options = {
                            method: 'POST',
                            body: data,
                            uri: action,
                            json: true // Automatically stringifies the body to JSON
                        };

                        console.log("post data", options);

                        return rp(options)
                            .then(function (resp) {
                                return Promise.delay(5000).then(function () {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Product Creation Mail sent to Super Admin";
                                    resolve(response)

                                });
                            })
                            .catch(function (err) {
                                response['err']['message'] = e.message;
                                reject(response);

                            });


                    }

                })
                .catch(function (e) {
                    response['err']['message'] = e.message;
                    reject(response);
                })
        }
    })
}
ApiActions.prototype.productDeleteAction = function (req, res) {

    var self = this;
    var input = req.body;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {
            return self.userServiceInstance.findAdmin(input)
                .then(function (responseData) {

                    var userData = JSON.parse(JSON.stringify(responseData))

                    if (userData.role === 'SuperAdmin') {

                        return self.userServiceInstance.deleteProduct(input)

                            .then(function (result) {
                                if (result != null) {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Product Deleted Successfully";
                                    resolve(response)
                                } else {
                                    resolve(response)
                                }

                            })

                    } else {
                        console.log("The person is Staff so send mail to Admin")
                        var data = {
                            email: userData.email,
                            productName: input.productName,
                            productDesc:input.productDesc,
                            productPrice:input.productPrice,
                            // productSpec:input.productSpec,
                            username: userData.username
                        }

                        var action = self.conf.productDeleteMailsentUrl;
                        var options = {
                            method: 'POST',
                            body: data,
                            uri: action,
                            json: true
                        };

                        console.log("post data", options);

                        return rp(options)
                            .then(function (resp) {
                                return Promise.delay(5000).then(function () {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Product Deletion Mail sent to Super Admin";
                                    resolve(response)

                                });
                            })
                            .catch(function (e) {
                                response['err']['message'] = e.message;
                                reject(response);
                            })


                    }

                })
                .catch(function (e) {
                    response['err']['message'] = e.message;
                    reject(response);
                })
        }
    })
}
ApiActions.prototype.updateProduct = function (req, res) {
    var self = this;
    var input = req.body;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {
            return self.userServiceInstance.findAdmin(input)
                .then(function (responseData) {

                    var userData = JSON.parse(JSON.stringify(responseData))

                    if (userData.role === 'SuperAdmin') {
                        console.log("if case")

                        return self.userServiceInstance.updateProduct(input)

                            .then(function (result) {
                                if (result != null) {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Product Updated Successfully";
                                    resolve(response)
                                } else {
                                    resolve(response)
                                }

                            })

                    } else {
                        console.log("The person is not SuperAdmin so send mail to SuperAdmin")
                        var data = {
                            email: userData.email,
                            productName: input.productName,
                            productDesc:input.productDesc,
                            productPrice:input.productPrice,
                            // productSpec:input.productSpec,
                            username: userData.username
                        }

                        var action = self.conf.updateProductMailsentUrl;
                        var options = {
                            method: 'POST',
                            body: data,
                            uri: action,
                            json: true // Automatically stringifies the body to JSON
                        };

                        console.log("post data", options);

                        return rp(options)
                            .then(function (resp) {
                                return Promise.delay(5000).then(function () {
                                    response['status'] = "SUCCESS";
                                    response['data']['message'] = "Update Product Details Mail sent to Super Admin";
                                    resolve(response)

                                });
                            })
                            .catch(function (err) {
                                response['err']['message'] = err.message;
                                reject(response);

                            });


                    }

                })
                .catch(function (e) {
                    response['err']['message'] = e.message;
                    reject(response);
                })
        }
    })
}
ApiActions.prototype.productCreateActivation = function (req, res) {
    var self = this;
    var input = req.query;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {

            return self.userServiceInstance.insertProduct(input)

                .then(function (result) {
                    if (result != null) {
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "Super Admin Accept the changes so Product Created Successfully";
                        resolve(response)
                    } else {
                        resolve(response)
                    }

                })
                .catch(function (err) {
                    response['err']['message'] = err.message;
                    reject(response);

                });

        } else {
            response['err']['message'] = "Missing Input Parameter"
            resolve(response)
        }
    })


}


ApiActions.prototype.productUpdateActivation = function (req, res) {
    var self = this;
    var input = req.query;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {

            return self.userServiceInstance.updateProduct(input)

                .then(function (result) {
                    if (result != null) {
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "Super Admin Accept the changes so Product Updated Successfully";
                        resolve(response)
                    } else {
                        resolve(response)
                    }

                })
                .catch(function (err) {
                    response['err']['message'] = err.message;
                    reject(response);

                });

        } else {
            response['err']['message'] = "Missing Input Parameter"
            resolve(response)
        }
    })


}

ApiActions.prototype.productDeleteActivation = function (req, res) {
    var self = this;
    var input = req.query;
    var response = {
        status: "FAILURE",
        err: {},
        data: {}
    };
    return new Promise(function (resolve, reject) {
        if (input && input.username) {

            return self.userServiceInstance.deleteProduct(input)

                .then(function (result) {
                    if (result != null) {
                        response['status'] = "SUCCESS";
                        response['data']['message'] = "Super Admin Accept the changes so Product Deleted Successfully";
                        resolve(response)
                    } else {
                        resolve(response)
                    }

                })
                .catch(function (err) {
                    response['err']['message'] = err.message;
                    reject(response);

                });

        } else {
            response['err']['message'] = "Missing Input Parameter"
            resolve(response)
        }
    })


}