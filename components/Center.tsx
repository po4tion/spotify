import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

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
	const { data: session } = useSession();
	const [color, setColor] = useState<string | undefined>(undefined);

	useEffect(() => {
		setColor(shuffle(colors)[colors.length - 1]);
	}, []);

	return (
		<div className="grow">
			<header className="absolute right-8 top-5">
				<div className="bg-red-300 cursor-pointer flex items-center space-x-3 opacity-90 p-1 pr-2 rounded-full hover:opacity-80">
					{session?.user.image ? (
						<div className="h-10 relative w-10">
							<Image
								className="rounded-full"
								src={session.user.image}
								alt="profile thumbnail"
								layout="fill"
								objectFit="cover"
								quality={100}
							/>
						</div>
					) : (
						<h1>No Image</h1>
					)}
					<h2>{session?.user.name}</h2>
					<ChevronDownIcon className="h-5 w-5" />
				</div>
			</header>

			<section
				className={`bg-gradient-to-b ${color} flex h-80 items-end space-x-7 text-white to-black`}
			>
				<h1>hello</h1>
			</section>
		</div>
	);
}

export default Center;
