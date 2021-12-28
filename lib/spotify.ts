import SpotifyWebApi from 'spotify-web-api-node';

const scopes: string = [
	'playlist-read-collaborative',
	'playlist-read-private',
	'streaming',
	'user-follow-read',
	'user-library-read',
	'user-modify-playback-state',
	'user-read-currently-playing',
	'user-read-email',
	'user-read-playback-state',
	'user-read-private',
	'user-read-recently-played',
	'user-top-read',
].join(',');

const params = {
	scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export default spotifyAPI;

export { LOGIN_URL };
