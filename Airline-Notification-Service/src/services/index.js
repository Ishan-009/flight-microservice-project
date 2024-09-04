module.exports = {
  EmailService: require("./email-service"),
};

// new technique:- exporting all the services files from index.js

// Here we will export all the services at one place, rather than importing different services many times in our index.js , we can simply export all services files from this file and then we have to only import this one/single time in our index.js or where we want to implement and want multiple services
