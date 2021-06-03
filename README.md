# Spower Hour

Spower Hour is an Angular 12 web application that lets you listen to the first minute of every song in a Spotify playlist.

## Authors

- [@joshglazer](https://www.github.com/joshglazer)

## Inspiration

I had the idea for this application while hanging out with some friends. When we were younger and in college, we would occasionally play a drinking game called "Power Hour" where you would make a CD that included the first minute of 60 songs, and you would take sip of your drink every time a new song was played. My friends and I were recently looking for an app that would let us recreate the experience with a Spotify playlist, and could not find one that worked, so I decided to build it.

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

## Development Process

### Application Architecture

Because this application is simple and has just one purpose, I chose to include all code in the [main Angular module](src/app/app.module.ts).

The module contains the following folders:

#### Auth

This folder contains an auth guard which checks if the user has a valid Spotify token and redirects to the home page if they do not have one.

#### Components

This folder contains two folders:

- The [layout](src/app/components/layout) folder contains a set of components that are used in the layout (such as the page header and footer) and also any components that are shared between pages (such as any components that display the track that is currently playing.)

- The [routes](src/app/components/routes) folder contains components that are related to the different routes in the [routing module](src/app/app-routing.module.ts).

#### Services

This folder contains a set of services that are used throughout the application.

- [GooleAnalyticsTrackerService](src/app/services/google-analytics-tracker/google-analytics-tracker.service.ts) is used to track page views and events in google analytics.

- [HttpErrorInterceptorService](src/app/services/http-error-interceptor/http-error-interceptor.service.ts) is used to catch api errors for outgoing requests and handle them appropriately. In my case, I chose to display the error message to the user so that they could help me debug any errors that I am not expecting. In the future I may choose to handle errors differently.

- [SpotifyApiService](src/app/services/spotify-api/spotify-api.service.ts) is used to strictly make API requests to the Spotify API Endpoints.

- [SpowerHourService](src/app/services/spotify-api/spotify-api.service.ts) is an experience service that interacts directly with the SpotifyApiService but wraps application specific logic around the Spotify API calls and stores state related to the results of those calls.

### Design

I chose a color scheme that matches the look and feel of Spotify's app, which is a black background with white text, and a green accent color.

### Integrations

This application integrates with the Spotify API to let the user interract with Spotify by retreiving a list of the playlist that they have created and playing tracks from those playlists.

### Challenges

#### API endpoints related to playing tracks do not provide feedback in the request/response cycle.

These API endpoints do not take immediate action or respond with a status that the action has occured. They simply alert Spotify that the user would like to play a track, and the track gets played asynchronously. I want to display the name and a picture related to the track that is currently playing, which became difficult because of the way that Spotify handles these requests. I was able to use an endpoint to get the current track, but I found that it did not provide the results needed if the endpoint was called immediately after proceeding to next track of a playlist. I experimented with some timing, and eventually found that if I wait a half second between playing the next track of a playlist and then requesting the currently playing track, it usually gave me the correct information.

#### The Spotify API does not allow for tracks to be played within the web browser.

I was hoping that the Spower Hour app could be a one-stop place to interact with and play spotify tracks. Unfortunately, at the time I started building this application, it did not seem possible to play tracks within the web browser. It appears that there is a way to do this now, so I would like to revisit this in the future when I have time. But for now, Spower Hour acts as a controller for a separate Spotify App that is open on a computer or device.
