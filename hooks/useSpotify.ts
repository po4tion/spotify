import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyAPI = new SpotifyWebApi({
	clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
	clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

function useSpotify() {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			// refresh token 발급 에러 발생 시, 로그인 페이지로 이동
			if (session.error === 'RefreshAccessTokenError') {
				signIn();
			}

			spotifyAPI.setAccessToken(session.user.accessToken);
		}
	}, [session]);

	return spotifyAPI;
}

export default useSpotify;
