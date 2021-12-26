import NextAuth, { Session, User, Account } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyAPI, { LOGIN_URL } from 'lib/spotify';
import { JWT } from 'next-auth/jwt';

interface JwtType {
	readonly token: JWT;
	readonly user?: User;
	readonly account?: Account;
}

interface SessionType {
	readonly token: JWT;
	readonly session: Session;
}

//
async function refreshAccessToken(token: JWT) {
	try {
		spotifyAPI.setAccessToken(token.accessToken);
		spotifyAPI.setRefreshToken(token.refreshToken);

		const { body: refreshedToken } = await spotifyAPI.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
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
		async jwt({ token, user, account }: JwtType): Promise<JWT> {
			// 로그인 진입 시 token 값 설정
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
				console.log('token is not expired');
				return token;
			}

			// Access token이 만료되었으면 refresh token으로 업데이트
			console.log('refreshAccessToken');
			return await refreshAccessToken(token);
		},

		// 세션 값 설정
		async session({ session, token }: SessionType): Promise<Session> {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
