# Welcome to Cloud Based Todo App

Hi! I'm **Gark Godwin Duque**. I and my team which composed of few students made this cloud based todo web app which is built through **MERN-stack** which we all know is composed of **4 Main Technologies**. This technologies are as follows :
- M - MongoDB Atlas
- E - Express JS
- R - React JS
- N - Node JS
These core technologies of our application makes a website app faster and smoother.

# Client-Server

This web app is composed of 2 main folders: **client** and **server**.

## server

The server contains folders and files that are used to run our simple server.
Our server is made of 3 main technologies which are:
- **NodeJS*** is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.
-  **ExpressJs** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. APIs.
-  **Mongoose** provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
Some files are not included due to security purposes and the 

## client
The client contains several folders and files which stands on the main technology:
- **ReactJS** is a JavaScript library for building user interfaces.


# How to build this app
Building this may take a while due to the dependencies and modules to be downloaded, specially for the client side.

 1. Clone this repositiory.
 2. Install the missing dependencies.
 3. Open two terminals.
 4. One terminal for: `cd app-name/server`
 5. One terminal for: `cd app-name/client`

## Building Server
**You will do this after changing directory to server.**
Install the missing dependencies starting from nodejs itself. To know which dependencies to install, you look it up to **package.json** file inside the server.
Inside the terminal with the server as its directory, do the following:
 1. `npm init -y`
>Do the remaining dependencies, look it up in said file.

**NOTE**
Our server also has **.env** file which contains the `PORT` and the database configuration `ATLAS_URI`.
1. Make a file in root directory: **.env**
2. Enter the `PORT` and `ATLAST_URI`
 You can follow the given example:
`PORT=5000
ATLAS_URI=YOUR_ATLAS_URI`
If you do not know what is your atlas uri, you can follow the documentation in  https://docs.mongodb.com/manual/reference/connection-string/ which is all about the connection string to be used.


## Building Client
**You will do this after changing directory to client.**
Install the missing dependencies starting from nodejs itself. To know which dependencies to install, you look it up to **package.json** file inside the server.
Inside the terminal with the server as its directory, do the following:
 1. `npx create-react-app .`
>Do the remaining dependencies, look it up in said file.
 

# How to run this app

After everything is set up, for server-side application and the client-side application. Running it is pretty easy.

 1. Server
 >If you are using nodemon and already set it up you can use `npm ` + your the keyword you used. For our set-up we used: `npm start`.
 2. Client
 >The default way to start a react app is through `npm start`

When the server is running, you can see your terminal log if it is really running. As for the client, it will also log it in its terminal including the port being used. The client will also open a tab with port given from the logs. If it does not open and it is already running, you can do it manually:

 1. Open a browser
 2. Enter `localhost:3000`
 3. Done!

# Congratulations!
You have now completely built the application! If you encountered any errors regarding this application, you can contact me through email or add on me on facebook.

 1. garkgodwinduque@gmail.com
 2. https://www.facebook.com/grakgdowin/

Thank you for using your precious time to read me.:kissing:
:heartpulse::star2::heartpulse:
