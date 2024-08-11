// middleware/myMiddleware.js
module.exports = function(req, res, next) {
    console.log('Middleware executed');
    next();
};
