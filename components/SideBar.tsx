/* 
	화면 좌측 사이드바 컴포넌트
*/

import {
	HomeIcon,
	LibraryIcon,
	PlusCircleIcon,
	SearchIcon,
} from '@heroicons/react/outline';
import { HeartIcon, RssIcon } from '@heroicons/react/solid';
import useSpotify from 'hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from 'atoms/playlistAtom';
import { Router, useRouter } from 'next/router';
interface PlaylistType {
	readonly id: string;
	readonly name: string;
}

function SideBar() {
	const { data: session } = useSession();
	const { push } = useRouter();
	const [playlists, setPlaylists] = useState<PlaylistType[] | null>(null);
	const [playlistId, setPlaylistId] = useRecoilState<string | null>(
		playlistIdState
	);
	const spotifyAPI = useSpotify();

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((data) => {
				setPlaylists(data.body.items);
			});
		}
	}, [session, spotifyAPI]);

	return (
		<div className="border-gray-900 border-r hidden h-screen overflow-y-scroll p-5 scrollbar-hide text-gray-500 text-xs max-w-[12rem] md:inline-flex lg:text-sm lg:max-w-[15rem]">
			<div className="space-y-4">
				<button
					className="flex items-center space-x-2 hover:text-white"
					onClick={() => push('https://www.spotify.com/kr-ko/')}
				>
					<HomeIcon className="h-5 w-5" />
					<p data-cy="홈">홈</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<SearchIcon className="h-5 w-5" />
					<p data-cy="검색">검색</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<LibraryIcon className="h-5 w-5" />
					<p data-cy="라이브러리">라이브러리</p>
				</button>
				<hr className="border-gray-900 border-t-[0.1px]" />

				<button className="flex items-center space-x-2 hover:text-white">
					<PlusCircleIcon className="h-5 w-5" />
					<p data-cy="재생목록-만들기">재생목록 만들기</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<HeartIcon className="h-5 text-red-500 w-5" />
					<p data-cy="찜-목록">찜 목록</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 text-green-500 w-5" />
					<p data-cy="RSS-피드">RSS 피드</p>
				</button>
				<hr className="border-gray-900 border-t-[0.1px]" />

				{playlists?.map(({ id, name }) => (
					<p
						key={id}
						onClick={() => setPlaylistId(id)}
						className="cursor-pointer hover:text-white"
					>
						{name}
					</p>
				))}
			</div>
		</div>
	);
}

export default SideBar;
