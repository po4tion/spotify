/* 
	홈 페이지
*/

import Center from 'components/Center';
import Player from 'components/Player';
import SideBar from 'components/SideBar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Home() {
	const { status } = useSession();
	const { replace } = useRouter();

	if (status === 'loading') {
		return (
			<div className="bg-black flex items-center justify-center h-screen overflow-hidden">
				<h1 className="font-bold text-white text-4xl">로딩중...</h1>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		replace('/login');

		return (
			<div className="bg-black flex items-center justify-center h-screen overflow-hidden">
				<h1 className="font-bold text-white text-4xl">
					로그인 페이지로 이동중...
				</h1>
			</div>
		);
	}

	return (
		<div className="bg-black h-screen overflow-hidden">
			<main className="flex">
				<SideBar />
				<Center />
			</main>

			<div className="bottom-0 sticky">
				<Player />
			</div>
		</div>
	);
}

export default Home;
