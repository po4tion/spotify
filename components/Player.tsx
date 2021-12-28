import {
	ReplyIcon,
	SwitchHorizontalIcon,
	VolumeUpIcon as VolumeDownIcon,
} from '@heroicons/react/outline';
import {
	FastForwardIcon,
	PauseIcon,
	PlayIcon,
	RewindIcon,
	VolumeUpIcon,
} from '@heroicons/react/solid';
import { currentTrackIdState, isPlayingState } from 'atoms/songListAtom';
import useSongInfo from 'hooks/useSongInfo';
import useSpotify from 'hooks/useSpotify';
import { debounce } from 'lodash';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

function Player() {
	const spotifyAPI = useSpotify();
	const { data: session } = useSession();
	const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(
		currentTrackIdState
	);
	const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
	const [volume, setVolume] = useState(50);
	const songInfo = useSongInfo();

	const getCurrentSong = useCallback(() => {
		if (!songInfo) {
			spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
				const id: string | undefined = data?.body?.item?.id;
				setCurrentTrackId(id as string);

				spotifyAPI.getMyCurrentPlaybackState().then((data) => {
					setIsPlaying(data.body?.is_playing);
				});
			});
		}
	}, [setCurrentTrackId, setIsPlaying, songInfo, spotifyAPI]);

	useEffect(() => {
		// 로그인은 했지만, 아직 어느 곡도 클릭하지 않았을 경우 spotify app에서 듣고 있던 음악 목록을 가져온다
		if (spotifyAPI.getAccessToken() && !currentTrackId) {
			getCurrentSong();
		}

		setVolume(50);
	}, [currentTrackId, spotifyAPI, session, songInfo, getCurrentSong]);

	const debouncedVolume = useMemo(
		() =>
			debounce((volume) => {
				spotifyAPI.setVolume(volume);
			}, 200),
		[spotifyAPI]
	);

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedVolume(volume);
		}
	}, [debouncedVolume, spotifyAPI, volume]);

	const handlePlayPause = () => {
		spotifyAPI.getMyCurrentPlaybackState().then((data) => {
			if (data.body.is_playing) {
				spotifyAPI.pause();
				setIsPlaying(false);
			} else {
				spotifyAPI.play();
				setIsPlaying(true);
			}
		});
	};

	// 현재 재생목록에서 선택되어 있는 노래 전의 노래 재생
	const handleSkipToPrevious = () => {
		spotifyAPI.skipToPrevious();
	};

	// 현재 재생목록에서 선택되어 있는 노래 다음의 노래 재생
	const handleSkipToNext = () => {
		spotifyAPI.skipToNext();
	};

	// previous, next 버튼 클릭 후 마우스가 해당 요소에서 벗어나면 data refresh
	const handleLeave = () => {
		spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
			const id: string | undefined = data?.body?.item?.id;
			setCurrentTrackId(id as string);

			spotifyAPI.getMyCurrentPlaybackState().then((data) => {
				setIsPlaying(data.body?.is_playing);
			});
		});
	};

	return (
		<div className="bg-gradient-to-b from-black h-24 grid grid-cols-3 to-gray-900 px-2 text-slate-500 text-xs md:px-8 md:text-base">
			{songInfo ? (
				<>
					<div className="flex items-center space-x-4">
						<div className="h-14 relative w-14">
							<Image
								src={songInfo?.album.images?.[0]?.url as string}
								alt={songInfo?.name}
								layout="fill"
								priority={true}
							/>
						</div>
						<div>
							<h3 className="text-white">{songInfo?.name}</h3>
							<p>{songInfo?.artists?.[0]?.name}</p>
						</div>
					</div>

					<div className="flex items-center justify-evenly">
						<SwitchHorizontalIcon className="button" />
						<RewindIcon
							className="button"
							onClick={() => handleSkipToPrevious()}
							onMouseLeave={() => handleLeave()}
						/>
						{isPlaying ? (
							<PauseIcon
								className="button h-7 w-7 sm:h-10 sm:w-10 text-white"
								onClick={() => handlePlayPause()}
							/>
						) : (
							<PlayIcon
								className="button h-7 w-7 sm:h-10 sm:w-10 text-white"
								onClick={() => handlePlayPause()}
							/>
						)}
						<FastForwardIcon
							className="button"
							onClick={() => handleSkipToNext()}
							onMouseLeave={() => handleLeave()}
						/>
						<ReplyIcon className="button" />
					</div>

					<div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
						<VolumeDownIcon
							className="button"
							onClick={() => volume > 0 && setVolume((v) => v - 5)}
						/>
						<input
							className="w-14 md:w-28"
							onChange={(e) => setVolume(Number(e.target.value))}
							type="range"
							min={0}
							max={100}
							value={volume}
						/>
						<VolumeUpIcon
							className="button"
							onClick={() => volume < 100 && setVolume((v) => v + 5)}
						/>
					</div>
				</>
			) : null}
		</div>
	);
}

export default Player;
