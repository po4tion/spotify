/* 
	화면 좌측 사이드바 컴포넌트
*/

import {
	HeartIcon,
	HomeIcon,
	LibraryIcon,
	LogoutIcon,
	PlusCircleIcon,
	RssIcon,
	SearchIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';

function SideBar() {
	const { data: session } = useSession();

	console.log('session: ', session);

	return (
		<div className="border-gray-900 border-r p-5 text-gray-500 text-sm">
			<div className="space-y-4">
				<button
					className="flex items-center space-x-2 hover:text-white"
					onClick={() => signOut()}
				>
					<LogoutIcon className="h-5 w-5" />
					<p data-cy="로그아웃">로그아웃</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
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
					<HeartIcon className="h-5 w-5" />
					<p data-cy="찜-목록">찜 목록</p>
				</button>
				<button className="flex items-center space-x-2 hover:text-white">
					<RssIcon className="h-5 w-5" />
					<p data-cy="RSS-피드">RSS 피드</p>
				</button>
				<hr className="border-gray-900 border-t-[0.1px]" />

				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
				<p className="cursor-pointer hover:text-white">재생목록 이름</p>
			</div>
		</div>
	);
}

export default SideBar;