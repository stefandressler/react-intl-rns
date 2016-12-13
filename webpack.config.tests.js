if (window && window.console) {
  console.log = () => {}; // eslint-disable-line no-console
  // console.error = () => {}; // eslint-disable-line no-console
}

// make sure you have your directory and regex test set correctly!
let context = require.context('./src', true, /.test\.js$/);
context.keys().forEach(context);
