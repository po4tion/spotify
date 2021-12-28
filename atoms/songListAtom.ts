import { atom } from 'recoil';

export const currentTrackIdState = atom<string | null>({
	key: 'currentTrackIdState',
	default: null,
});

export const isPlayingState = atom<boolean>({
	key: 'isPlayingState',
	default: false,
});
