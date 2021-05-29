# Spower Hour

Spower Hour is an Angular 12 web application that lets you listen to the first minute of every song in a Spotify playlist.

## Authors

- [@joshglazer](https://www.github.com/joshglazer)

## Demo

A live demo of Spower Hour is available at https://spowerhour.joshglazer.com. This demo is hosted on [Netlify](https://www.netlify.com/) and deployed through a pipeline that is triggered every time code is merged into the main branch of the GitHub repository.

## Run Locally

Clone the project

```bash
  git clone git@github.com:joshglazer/spower-hour.git
```

Go to the project directory

```bash
  cd spower-hour
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Environment Variables

The following environment variables are able to be overridden by adding them to a environment.[environment-name].ts file.

`production` A boolean variable that specified whether the code should be compiled using production or development mode.

`spotifyClientKey` A Spotify API Key that can be used to connect to Spotify to retreive playlist information or play tracks on a user's device. An API key can be generated on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).

`counterLength`: The amount of time that a track should play before proceeding to the following track. The default value is 60 but it may be helpful to override this to a smaller value when running and debugging locally.

`gTagId`: A Google Analytics Tag ID that is used to track a user's interactions with the application. A Google Analytics Tag ID can be generated at the [Google Analytics Dashboard](https://analytics.google.com)

## Deployment

To deploy this project run

```bash
  npm run build
```

Once this command has been ran, a production build of this application will be available in a folder named `dist`. This compiled code can be deployed to any web server.
