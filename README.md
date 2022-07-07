# Live demo
https://ongird.herokuapp.com/

# Guide to run the project locally

**For Windows system (Windows 10, Windows 11,can also work for Linux and Mac systems ocassionally).

First of all you will need Node.js,Git,any code editor and a browser installed on your computer.
You will need Git to clone the project on your computer,code editor to open it,Node.js to run it and browser to visit it.You will also need MongoDB installed if you are using local database.
To have the project locally you have to clone it from Github.
MVC pattern was used to make the project,so you will need to run   

 > 'npm install'

from /backend and /frontend folders.Than you can run /frontend by command 

 > 'npm start'

To run /backend you will need to add .env file to it for environment variables. Your .env file needs to have these variables.

SESSION_SECRET= ....  

PORT=3001

MONGODB_URL= ...

If you are using your own database, your database should have collections named 'users' 
and 'results', where 'users' should have a document with 'email' and 'password' properties,
where password should be hashed by module 'bcrypt'.Also the 'results' collection should have
a document with 'email' property to find the user and 'result' property for exam score. 
You can also use my MongoDB url which is
 'mongodb+srv://Ghazaryan2409:AR122333@cluster0.jh3pp.mongodb.net/OnGrid'
which you don't need to run and won't need MongoDB installed.The email and password for the project's authorization page of this database are 'user@email.com' and 'password1'.
You can also make manual changes from /controllers/signIn controller if you can't provide hashed password or just skip all database parts if both variants are unavailable.
SESSION_SECRET variable can be of any value and PORT variable should have the value of 3001.
After these configurations you can run command 

 >'npm run start'
 
from '/backend' and run the server to use it in synchrony with frontend.After all these
you can visit the web server 
http://localhost:3000
and watch the project working.