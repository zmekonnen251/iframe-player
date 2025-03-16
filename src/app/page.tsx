'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
	PlyrLayout,
	plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';

const PlayerContent = () => {
	const query = useSearchParams();
	const videoId = query.get('videoId');

	if (!videoId) return <p>Loading...</p>;

	console.log({ videoId });

	return (
		<div className='aspect-video relative bg-black overflow-hidden shadow-2xl group'>
			<MediaPlayer
				aspectRatio='16/9'
				autoPlay={true}
				src={`youtube/${videoId}`}
			>
				<MediaProvider />
				<PlyrLayout
					icons={plyrLayoutIcons}
					displayDuration
					controls={[
						'pip',
						'play',
						'progress',
						'current-time',
						'mute+volume',
						'restart',
						'rewind',
						'fullscreen',
						'settings',
					]}
				/>
			</MediaPlayer>
		</div>
	);
};

const EmbedPlayer = () => {
	return (
		<Suspense fallback={<p>Loading player...</p>}>
			<PlayerContent />
		</Suspense>
	);
};

export default EmbedPlayer;
