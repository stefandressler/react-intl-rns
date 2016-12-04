// make sure you have your directory and regex test set correctly!
let context = require.context('./src', true, /-test\.js$/);
context.keys().forEach(context);
