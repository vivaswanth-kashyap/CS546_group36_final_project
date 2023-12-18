/*
You can choose to define all your middleware functions here, 
export them and then import them into your app.js and attach them that that.
add.use(myMiddleWare()). you can also just define them in the app.js if you like as seen in lecture 10's lecture code example. If you choose to write them in the app.js, you do not have to use this file. 
*/

export const rewriteUnsupportedBrowserMethods = (req, res, next) => 
{
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
  
    // let the next middleware run:
    next();
};

export const allowAuthenticatedUser = (req, res, next) => 
{
  if (!req.session.user) 
  {
    return res.redirect('/login');
  }
  else{
    next();
  }
};

export const rejectAuthenticatedUser = (req, res, next) => 
{
  if (req.session.user) 
  {
    return res.redirect('/');
  }
  else{
    next();
  }
};