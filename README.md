# EOS-Crystal-Interface

Please make sure you have connected to EOS MongoDB database in localhost. You can also copy the EOS database to your local MongoDB.

Change the port in server/src/db/mongoose.js to the one you are using. The current port is 27017 (mongodb://127.0.0.1:27017/eos).

In the project directory, you need to open two terminals and run these lines of code:

Terminal 1: (server)
### `cd server` 
### `npm install` (just need to run in the first time)
### `npm start`
The server will run in port 5000 (http://localhost:5000)

Terminal 2: (frontend)
### `cd frontend` 
### `npm install` (just need to run in the first time)
### `npm start`

To run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\

Note: If you want to use local MongoDB (using port 27017) instead of online MongoDB (using another port), run this command line beforehand:

### `sudo systemctl start mongod.service`
