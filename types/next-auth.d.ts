import { JWT } from 'next-auth/jwt';
import { Session, Account } from 'next-auth';

declare module 'next-auth/jwt' {
	interface JWT {
		readonly accessToken: string;
		readonly refreshToken: string;
		readonly accessTokenExpires: number;
		readonly username: string;
	}
}

declare module 'next-auth' {
	interface Account {
		readonly access_token: string;
		readonly expires_in: number;
		readonly refresh_token: string;
		readonly providerAccountId: string;
	}

	interface Session {
		readonly user: {
			accessToken: string;
			refreshToken: string;
			username: string;
		};
	}
}
