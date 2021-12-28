/* 
	홈 페이지
*/

import Center from 'components/Center';
import Player from 'components/Player';
import SideBar from 'components/SideBar';

function Home() {
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
