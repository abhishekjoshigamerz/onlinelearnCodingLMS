# OnlineLearn Code Web App

## Overview

The OnlineLearn Code Web App is an interactive online code learning platform. Designed to mirror popular tools like HackerRank and Codecademy, this full-stack application offers a streamlined and engaging learning experience for all users. The live version of the application can be accessed at (https://www.codemaster99.xyz/).

## Architecture

The application utilizes a two-tier architecture with separate backend and frontend folders.

- The **Backend** folder contains the server-side application built with Node.js. It manages APIs, data processing, and server-side logic and also dashboard panel for adding courses exercise for front end.
- The **Frontend** folder holds the client-side application, created with React.js, which provides the user interface and manages user interactions.

## Features

- Interactive coding challenges across various programming languages.
- Real-time code execution and feedback.
- Uses Chat GPT 3 api AI to teach you programming stuff

## Running Locally

To run this application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate into the cloned repository.
3. Install the necessary dependencies in both backend and frontend folders.
4. Install judge0 in your system or server.
5. Get your own chat gpt open ai key to use.
   In the Backend folder:

```
npm install
```

In the Frontend folder:

```
npm install
```

4. To start the server, go to the backend folder and run:

```
node server.js
```

5. To start the React app, go to the frontend folder and run:

```
npm start
```

Please note, the backend server and React app must be running concurrently for the application to function properly.

## Contributing

If you'd like to contribute to the project, please feel free to fork the repository, create a feature branch, and then submit a Pull Request.

## License

This project is licensed under the terms of the MIT license. Please see the [LICENSE](LICENSE.md) file for details.
