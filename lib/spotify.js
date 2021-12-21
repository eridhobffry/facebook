import SpotifyWebApi from 'spotify-web-api-node'

const scopes = [
    "ugc-image-upload",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-email",
    "user-follow-read",
    "streaming",
    "app-remote-control",
    "user-read-playback-position",
    "user-top-read",
    "user-read-recently-played",
    "playlist-read-collaborative",
    "playlist-modify-private",
    "playlist-read-private",
    "user-library-read",
].join(",")

const params = {
    scope: scopes
}

const queryParamsString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/en/authorize?${queryParamsString}`

export const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})