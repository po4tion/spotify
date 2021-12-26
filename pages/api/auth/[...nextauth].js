import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyAPI, { LOGIN_URL } from 'lib/spotify';

async function refreshAccessToken(token) {
	try {
		spotifyAPI.setAccessToken(token.accessToken);
		spotifyAPI.setRefreshToken(token.refreshToken);

		const { body: refreshedToken } = await spotifyAPI.refreshAccessToken();

		console.log('REFRESHED TOKEN', refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);

		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			// 로그인 진입 시
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
				};
			}

			// access token이 만료되지 않았으면 이전의 토큰 값 전달
			if (Date.now() < token.accessTokenExpires) {
				console.log('토큰의 기한이 남았습니다.');
				return token;
			}

			// Access token이 만료되었으면 refresh token으로 업데이트
			console.log('토큰의 기한이 만료되어 refresh token을 발급합니다.');
			return await refreshAccessToken(token);
		},

		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
