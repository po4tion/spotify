/* 
  로그인 페이지
*/

import { GetServerSideProps, NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';

interface Props {
	providers: {
		spotify: {
			id: string;
			name: string;
			type: string;
			signinUrl: string;
			callbackUrl: string;
		};
	};
}

const login: NextPage<Props> = ({ providers }) => {
	return (
		<div className="bg-black flex flex-col items-center justify-center min-h-screen w-full">
			<div className="w-52 h-52 mb-5 relative">
				<Image
					src="https://links.papareact.com/9xl"
					alt="Spotify 로그인 썸네일"
					layout="fill"
					priority={true}
				/>
			</div>

			{Object.values(providers).map((provider) => (
				<div key={provider.name}>
					<button
						className="bg-[#18D860] text-white p-5 rounded-full"
						onClick={() => signIn(provider.id, { callbackUrl: '/' })}
					>
						Login With {provider.name}
					</button>
				</div>
			))}
		</div>
	);
};

export default login;

export const getServerSideProps: GetServerSideProps = async () => {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
};
