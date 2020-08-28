 
var recast = require('recast');

// Checks if route already exists
module.exports = function findRoutes(name, routes, identifier, addAction) {
  var routeFound = false // default

  recast.visit(routes, {
    visitExpressionStatement: function(path) {
      var node = path.node;

      // Checks if route exists 
      if (node.expression.callee.name == "classRoute" && node.expression.arguments[0].value == name) {
        // Route is found so set to true
        routeFound = true

        // Check if findRoutes function is called by ADD & not REMOVE
        if(addAction){
          // If route exists then update the property value to the vocabulary given by the user
          node.expression.arguments[1].properties[0].value = `'${identifier}'`
        }

        // Exit loop
        return false;
        
      } else {
        // Loop other nodes
        this.traverse(path);
      }
    }
  });

  return routeFound ;
};