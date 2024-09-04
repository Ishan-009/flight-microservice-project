module.exports = {
  InfoController: require("./info-controller"),
  EmailController: require("./email-controller"),
};

// new technique:- exporting all the controllers files from index.js

// Here we will export all the controllers at one place, rather than importing different controllers many times in our index.js , we can simply export all controllers files from this file and then we have to only import this one/single time in our index.js or where we want to implement and want multiple controllers
