const { userDetails } = require("../model/model.js");
const { Candidate } = require("../model/model.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

exports.getForm = (req, res, next) => {
  res.render("form", { formTitle: "form" });
};

exports.postForm = (req, res, next) => {
  const fn = req.body.username;
  const ln = req.body.lastname;
  const pn = req.body.phonenumber;

  const candidate = new Candidate({
    fname: fn,
    lname: ln,
    phoneno: pn,
  });
  candidate
    .save()
    .then(() => {
      res.redirect("/first");
    })
    .catch((err) => {
      console.log("error encountered!");
    });
};

exports.getFirst = (req, res, next) => {
  Candidate.find()
    .then((Credential) => {
      res.render("first", {
        cand: Credential,
        pagetitle: "firstPage",
        username: "user",
      });
    })
    .catch((err) => {
      console.log("caught an error!");
    });
};

exports.removeForm = (req, res, next) => {
  const candId = req.params.id;

  Candidate.findByIdAndDelete(candId)
    .then((result) => {
      res.redirect("/first");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateDetails = (req, res, next) => {
  const id = req.params.id;

  Candidate.find()
    .then((result) => {
      res.render("updateform", {
        resultid: id,
        rfn: result.fname,
        rln: result.lname,
        rph: result.phoneno,
        value: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updatePostDetails = (req, res, next) => {
  const ufn = req.body.username;
  const uln = req.body.lastname;
  const upn = req.body.phonenumber;
  const id = req.params.id;

  Candidate.findByIdAndUpdate(id, {
    fname: ufn,
    lname: uln,
    phoneno: upn,
  }).catch((err) => {
    console.log(err);
  });
  res.redirect("/first");
};

exports.getLoginForm = (req, res, next) => {
  res.render("login");
};

exports.postLoginForm = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await userDetails.findOne({ username: username });

  if (user) {
    const cmp = await bcrypt.compare(password, user.password);

    if (cmp) {
      res.redirect("/form");
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
};

exports.getSignForm = (req, res, next) => {
  res.render("signup");
};

exports.postSignForm = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const hashedPwd = await bcrypt.hash(password, 12);

  await userDetails
    .findOne({ username: username })
    .then((userExist) => {
      if (userExist) {
        res.redirect("/signup");
      } else {
        const user = new userDetails({
          username: username,
          password: hashedPwd,
        });

        user.save();
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
