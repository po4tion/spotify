import { atom } from 'recoil';

interface ImageObject {
	readonly url?: string;
}

export interface AlbumObject {
	readonly images: ImageObject[];
	readonly name: string;
}

export interface ArtistsObject {
	readonly name: string;
}

export interface PlaylistTrackObject {
	readonly track?: {
		readonly album: AlbumObject;
		readonly artists: ArtistsObject[];
		readonly duration_ms: number;
		readonly id: string;
		readonly name: string;
		readonly uri: string;
	};
}

export interface PlaylistType {
	readonly description: string | null;
	readonly name: string;
	readonly images: ImageObject[];
	readonly items: PlaylistTrackObject[];
}

export const playlistState = atom<PlaylistType | null>({
	key: 'playlistState',
	default: null,
});

export const playlistIdState = atom<string | null>({
	key: 'playlistIdState',
	default: null,
});
