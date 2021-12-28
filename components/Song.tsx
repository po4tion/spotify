import { PlaylistTrackObject } from 'atoms/playlistAtom';
import { currentTrackIdState, isPlayingState } from 'atoms/songListAtom';
import useSpotify from 'hooks/useSpotify';
import { durationTime } from 'lib/durationTime';
import Image from 'next/image';
import { useRecoilState } from 'recoil';

interface SongType extends PlaylistTrackObject {
	readonly order: number;
}

function Song({ track, order }: SongType) {
	const spotifyAPI = useSpotify();
	const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(
		currentTrackIdState
	);
	const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);

	const handleOrder = () => {
		const realOrderValue = order + 1;
		const checkOrder =
			realOrderValue < 10 ? (
				<>
					<span className="opacity-0">0</span>
					{realOrderValue}
				</>
			) : (
				realOrderValue
			);

		return checkOrder;
	};

	const playSong = () => {
		if (track) {
			setCurrentTrackId(track.id);
			setIsPlaying(true);
			spotifyAPI.play({
				uris: [track.uri],
			});
		}
	};

	return (
		<div
			className="grid grid-cols-2 px-5 py-2 rounded-lg text-slate-500 hover:bg-slate-900"
			onClick={playSong}
		>
			<div className="flex items-center space-x-4">
				<p>{handleOrder()}</p>
				<div className="h-10 min-h-10 min-w-10 relative w-10">
					<Image
						src={track?.album.images[0].url as string}
						alt={track?.album.name}
						layout="fill"
						priority={true}
					/>
				</div>
				<div>
					<p className="text-white truncate w-44 lg:w-64">{track?.name}</p>
					<p className="w-44 lg:w-64">{track?.artists[0].name}</p>
				</div>
			</div>

			<div className="flex items-center ml-auto justify-between  md:ml-0">
				<p className="hidden font-bold md:inline">{track?.album.name}</p>
				<p>{durationTime(track?.duration_ms as number)}</p>
			</div>
		</div>
	);
}

export default Song;
