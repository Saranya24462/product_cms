var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/content_management_system';
mongoose.connect(mongoDB, {useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.set('useFindAndModify', false);


var UserService = function (app) {

    this.app = app;

};
module.exports = UserService;


UserService.prototype.init = function () {
}

UserService.prototype.insert = function (input) {

    var BookSchema = mongoose.Schema({
        email: String,
        password: String,
        role: String,
        username: String

    });

    var Book = mongoose.model('user', BookSchema, 'users');

    var book1 = new Book({
        email: input.email,
        password: input.password,
        role: input.role,
        username: input.username
    });
    return mongoose.connection.collection('users').insert(book1);
}


UserService.prototype.findAdmin = function (input) {

    console.log("input", input)
    var schema = new mongoose.Schema({
        username: String,
    })

    var user = mongoose.model('users', schema,'users');

    // console.log("data",data)
    return user.findOne({'username': input.username}, {
        'role': 1,
        '_id': 0,
        'email': 1,
        'username': 1
    }, function (err, athletes) {
        if (err) return handleError(err);
        console.log(athletes)
    })
}
UserService.prototype.insertProduct = function (input) {

    var schema = mongoose.Schema({
        productName: String,
        productDesc: String,
        productPrice: Number,
        createdUser: String,

    });

    var product = mongoose.model('product', schema, 'product_details');

    var productData = new product({
        productName: input.productName,
        productDesc: input.productDesc,
        productPrice: input.productPrice,
        createdUser: input.username
    });
    return mongoose.connection.collection('product_details').insert(productData);

}
UserService.prototype.deleteProduct = function (input) {

    var schema = mongoose.Schema({

        productName: {type: String, required: true},


    });

    var productObject = mongoose.model('customers', schema, 'product_details');


    var query = {productName: input.productName};

    return productObject.deleteOne(query, function (err, result) {

        if (err) {

            console.log("error query");

        } else {

            console.log(result);

        }

    })
}

UserService.prototype.updateProduct = function (input) {


    var schema = mongoose.Schema({

        productName: {type: String, required: true},

        productPrice: {type: Number, required: true},

        productDesc:{type: String, required: true}

    });

    var productObject = mongoose.model('product', schema, 'product_details');


    var query = {productName: input.productName};

    return productObject.findOneAndUpdate(query, {$set: {productPrice: input.productPrice,productDesc : input.productDesc}}, {upsert: true}, function (err, result) {

        if (err) {

            console.log("error query");

        } else {

            console.log(result, "result");

        }

    })
}




