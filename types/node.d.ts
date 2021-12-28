declare namespace NodeJS {
	interface ProcessEnv {
		/** node environment */
		JWT_SECRET: string;
		NEXT_PUBLIC_SPOTIFY_CLIENT_ID: string;
		NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET: string;
	}
}
