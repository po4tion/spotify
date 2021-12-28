import { AlbumObject, ArtistsObject } from 'atoms/playlistAtom';
import { currentTrackIdState } from 'atoms/songListAtom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSpotify from './useSpotify';

export interface SongInfoObject {
	readonly album: AlbumObject;
	readonly artists: ArtistsObject[];
	readonly name: string;
}

function useSongInfo() {
	const spotifyAPI = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(
		currentTrackIdState
	);
	const [songInfo, setSongInfo] = useState<SongInfoObject | null>(null);

	useEffect(() => {
		const getSongInfo = async () => {
			if (currentTrackId) {
				const trackInfo = await fetch(
					`https://api.spotify.com/v1/tracks/${currentTrackId}`,
					{
						headers: {
							Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
						},
					}
				).then((res) => res.json());

				setSongInfo(trackInfo);
			}
		};

		getSongInfo();
	}, [currentTrackId, spotifyAPI]);

	return songInfo;
}

export default useSongInfo;
