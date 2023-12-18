//import express, express router as shown in lecture code
import * as users from "../data/users.js";
import * as helper from "../helpers/usersHelper.js";
import express from 'express';
import xss from 'xss';

const router = express.Router();

router
  .route('/register')
  .get(async (req, res) => {
    return res.render('register', {title:"Register", css: "users", js: "users"});
  })
  .post(async (req, res) => {

    let firstName = xss(req.body.firstNameInput);
    let lastName = xss(req.body.lastNameInput);
    let emailAddress = xss(req.body.emailAddressInput);
    let password = xss(req.body.passwordInput);
    let academicStatus = xss(req.body.academicStatusInput);
    let output = undefined;
    let userInfo = {firstName, lastName, emailAddress, password, academicStatus};
    // Validate input 
    try
    {
      firstName = helper.validString(firstName);
      lastName = helper.validString(lastName);
      emailAddress = helper.validString(emailAddress);
      password = helper.validString(password);
      academicStatus = helper.validString(academicStatus);
    
      emailAddress = emailAddress.toLowerCase();
      academicStatus = academicStatus.toLowerCase();
      let regex = /^[a-zA-Z]+$/;
    
      if (!regex.test(firstName) || firstName.length < 2 || firstName.length > 25) throw `${firstName} is not a valid First name`;
      if (!regex.test(lastName) || lastName.length < 2 || lastName.length > 25) throw `${lastName} is not a valid Last name`; 
      if (!helper.validEmail(emailAddress)) throw `${emailAddress} is not a valid email`;
      if (!helper.validPassword(password)) throw `${password} is not a valid password`;
      if (!helper.validStatus(academicStatus)) throw `${academicStatus} is not a valid academicStatus`;

      output = await users.registerUser(firstName, lastName, emailAddress, password, academicStatus);

    } catch (e)
    {
      return res.status(400).render('register', {title:"Register", error:e, css: "users", js: "users", userInfo: userInfo});
    }
    if (output.insertedUser == true)
    {
      return res.redirect('login');
    }
    
    return res.status(500).render('error', {title: "Error", error: "Internal Server Error"});
  });

router
  .route('/login')
  .get(async (req, res) => {
    return res.render('login', {title:"Login", css: "users", js: "users"});
  })
  .post(async (req, res) => {
    let emailAddress = xss(req.body.emailAddressInput);
    let password = xss(req.body.passwordInput);

    // Validate input 
    try
    {
      emailAddress = helper.validString(emailAddress);
      password = helper.validString(password);
    
      emailAddress = emailAddress.toLowerCase();
    
      if (!helper.validEmail(emailAddress) || !helper.validPassword(password)) throw `Either the email address or password is invalid`;

    } catch (e)
    {
      return res.status(400).render('login', {title:"Login", error:e, css: "users", js: "users"});
    }

    try 
    {
      let output = await users.loginUser(emailAddress, password);
      req.session.user = output;
      return res.redirect('/');

    } catch (e) {
      return res.status(500).render('login', {title: "Login", error: e, css: "users", js: "users"});
    }
  });


router.route('/logout').get(async (req, res) => {
  if (req.session.user)
  {
    req.session.destroy();
  }
  return res.redirect("/");
});

//export router
export default router;

