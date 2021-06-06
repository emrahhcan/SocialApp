# SocialApp

Basic social media app which has created by using React for front-end, NodeJS, Express, with graphQL for back-end, and MongoDB Atlas which is based on NOSQL.

Please check out URL given below to be able to visit the site.

https://fullstacksocialapp.netlify.app

To be able see on your local machine please clone the repository, or download the zip file from repository. 

* Then, open it with your text editor such as VS Code

* After all, add a config.js file into the main folder put your MongoDB database connection and your key. It must be like shown below.

**  module.exports = {

        MONGODB: 
        
            'mongodb+srv://usernam:password@cluster0.ktfkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            
        SECRET_KEY: 
        
            'Secret Key'
            
    };
  
* Last, there are two steps to get done.

* * The first, open the terminal/bash then type "npm start" when you are in the main folder.

* * The second, type "cd client" commands to the terminal to go into client folder, and type "npm start" to terminal when you are in client folder.

There are some small bugs which will be fixed soon, and one of them is you need to refresh the page to see delete icon and your name on the navbar after you login.
