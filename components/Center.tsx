import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {
	MusicNoteIcon,
	PhotographIcon,
	LogoutIcon,
} from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
	PlaylistType,
	playlistState,
	playlistIdState,
} from 'atoms/playlistAtom';
import useSpotify from 'hooks/useSpotify';
import SongList from './SongList';

// 무작위 색 7가지
const colors: string[] = [
	'from-indigo-500',
	'from-blue-500',
	'from-green-500',
	'from-red-500',
	'from-yellow-500',
	'from-pink-500',
	'from-purple-500',
];

function Center() {
	const spotifyAPI = useSpotify();
	const { data: session } = useSession();
	const [color, setColor] = useState<string | undefined>(undefined);
	const playlistId = useRecoilValue(playlistIdState);
	const [playlist, setPlaylist] = useRecoilState<PlaylistType | null>(
		playlistState
	);

	useEffect(() => {
		// 렌더링 될 때마다, 플레이리스트가 변경될 때마다 배경 변경
		setColor(shuffle(colors).pop());
	}, [playlistId]);

	useEffect(() => {
		// 플레이리스트를 클릭하여 atom에 Id 값이 선언되었다면
		if (playlistId) {
			spotifyAPI
				.getPlaylist(playlistId)
				.then((data) => {
					const { description, name, images, tracks } = data.body;

					setPlaylist({
						description,
						name,
						images,
						items: tracks.items,
					});
				})
				.catch((error) => console.error(error));
		}
	}, [spotifyAPI, playlistId, setPlaylist]);

	return (
		<div className="grow h-screen overflow-y-scroll">
			{/* 프로필 */}
			<header className="absolute right-8 top-5">
				<div
					className="bg-black cursor-pointer flex items-center opacity-90 p-1 pr-2 rounded-full space-x-3 text-white hover:bg-gray-900"
					onClick={() => signOut()}
				>
					{session?.user.image ? (
						<div className="h-10 relative w-10">
							<Image
								className="rounded-full"
								src={session.user.image}
								alt="profile thumbnail"
								layout="fill"
								objectFit="cover"
								priority={true}
							/>
						</div>
					) : (
						<PhotographIcon className="h-10 w-10" />
					)}
					<h2>{session?.user.name}</h2>
					<LogoutIcon className="h-5 w-5" />
				</div>
			</header>

			{/* 플레이리스트 설명 */}
			<section
				className={`bg-gradient-to-b ${color} flex h-80 items-end p-8 space-x-7 text-white to-black`}
			>
				{playlist ? (
					<>
						<div className="h-44 relative shadow-2xl w-44">
							{playlist?.images[0]?.url ? (
								<Image
									src={playlist.images[0].url}
									alt={playlist.name}
									layout="fill"
									priority={true}
								/>
							) : (
								<div className="bg-slate-800 flex h-44 items-center justify-center w-44">
									<MusicNoteIcon className="h-20 w-20" />
								</div>
							)}
						</div>
						<div>
							<p>플레이리스트</p>
							<h1 className="font-bold text-2xl md:text-3xl xl:text-5xl">
								{playlist.name}
							</h1>
							<p
								className="font-bold text-slate-600 text-sm"
								dangerouslySetInnerHTML={{
									__html: playlist.description as string,
								}}
							></p>
						</div>
					</>
				) : null}
			</section>

			<div>
				<SongList />
			</div>
		</div>
	);
}

export default Center;
