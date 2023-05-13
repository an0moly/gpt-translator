# Translation App

This is a Node.js application that translates text from any language to a specified target language using OpenAI's GPT-4/3 language model. The application uses Express as the web framework, socket.io for real-time communication, and Axios for HTTP requests.

## Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Update the `.env` file with the following variables:
    - `OPENAI_API_KEY`: Your OpenAI API key
    - `OPENAI_MODEL`: The name of the OpenAI GPT-4/3 model you want to use
4. Run `node app.js` to start the application

## Dependencies

- Express: A web framework for Node.js
- body-parser: A middleware for parsing HTTP request bodies
- Axios: A Promise-based HTTP client for Node.js and the browser
- dotenv: A module for loading environment variables from a .env file
- socket.io: A JavaScript library for real-time communication

## Files

- `app.js`: The main application file that sets up the server and socket.io
- `rules.js`: A module that exports a function that returns an array of messages to send to the OpenAI API for translation
- `index.html`: The front-end HTML file for the translation app
- `langName.js`: A module that exports a function to get the language name given a language code

## Front-end

The front-end of the application is a simple HTML form that takes in a source text and target language, and displays the translated text. It also has a swap button to reverse the source and target languages, and a copy button for the translated text.

## How it Works

When a user submits a translation request through the form, the front-end sends a socket.io event to the server with the source text and target language. The server then uses the `rules.js` module to generate an array of messages to send to the OpenAI API for translation. Once the API returns a response, the server sends a socket.io event back to the front-end with the translated text, which is then displayed in the browser.

## License

This project is licensed under the <a href="https://github.com/Kryvexa/gpt-translation/blob/main/LICENSE">MIT License</a>.
