const { test } = require("./model.js");

const controller = {};

controller.addPerson = (req, res, next) => {
  console.log("add person controller");
  console.log(req.body.name);
  console.log(req.body.message);

  const { name, message } = req.body;

  test
    .create({ name, message })
    .then(result => {
      console.log("added");
      console.log(result);
      // res.locals.id = result._id;
      return next();
    })
    .catch(e => {
      throw Error(e);
    });
};

controller.getPeople = (req, res, next) => {
  // console.log("get messages controller");

  if (res.locals.cache === null) {
    test.find().then(result => {
      console.log("db");
      console.log(result);

      res.locals.queryResponse = result;

      return next();
    });
  } else {
    return next();
  }
};

controller.getPerson = (req, res, next) => {
  if (res.locals.cache === null) {
    // console.log("in db");
    // console.log(req.body.name);
    test.findOne({ name: req.body.query }).then(result => {
      // console.log("db with cache");
      // console.log(result);

      const response = {
        message: result.message
      };

      res.locals.queryResponse = response;

      return next();
    });
  } else {
    return next();
  }
};

controller.getPersonDB = (req, res, next) => {
  console.log("in db");
  test.findOne({ name: req.body.query }).then(result => {
    console.log("db");
    console.log(result);

    const response = {
      message: result.message
    };

    res.locals.queryResponse = response;

    return next();
  });
};

// controller.getTestDB = (req, res, next) => {
//   // console.log("get messages DB controller");

//   test.find().then(result => {
//     // console.log(result);

//     res.locals.queryResponse = result;

//     return next();
//   });
// };

module.exports = controller;
