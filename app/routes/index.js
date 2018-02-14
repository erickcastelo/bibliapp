var path = require('path');

module.exports  = function(app) {

    // habilitando HTML5MODE
    app.all('/*', function(req, res) {
        res.sendFile(path.resolve('dist/index.html'));
    });
};