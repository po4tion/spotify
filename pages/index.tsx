import SideBar from 'components/SideBar';

function Home() {
	return (
		<div className="bg-black h-screen overflow-hidden">
			<main>
				<SideBar />
				{/* body */}
			</main>

			<div>{/* Player */}</div>
		</div>
	);
}

export default Home;
