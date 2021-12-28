import { playlistState } from 'atoms/playlistAtom';
import { useRecoilValue } from 'recoil';
import Song from './Song';

function SongList() {
	const songList = useRecoilValue(playlistState);

	return (
		<div className="flex flex-col pb-28 px-8 space-y-1 text-white">
			{songList?.items?.map(({ track }, idx) => (
				<Song key={track?.id} track={track} order={idx} />
			))}
		</div>
	);
}

export default SongList;
