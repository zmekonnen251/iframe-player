'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
	isYouTubeProvider,
	MediaPlayer,
	MediaPlayerInstance,
	MediaProvider,
	MediaProviderAdapter,
	Poster,
	useMediaState,
} from '@vidstack/react';
import {
	PlyrLayout,
	plyrLayoutIcons,
} from '@vidstack/react/player/layouts/plyr';

const PlayerContent = () => {
	const playerRef = useRef<MediaPlayerInstance>(null);
	const query = useSearchParams();
	const videoId = query.get('videoId');
	const isStarted = useMediaState('started', playerRef);

	useEffect(() => {
		if (playerRef.current) {
			playerRef.current?.startLoading();
		}
	}, [videoId]);

	if (!videoId) return <p>Loading...</p>;

	function onProviderChange(provider: MediaProviderAdapter | null) {
		if (isYouTubeProvider(provider)) {
			provider.cookies = true;
		}
	}

	return (
		<div className='aspect-video relative bg-black overflow-hidden shadow-2xl group'>
			<MediaPlayer
				ref={playerRef}
				onProviderChange={onProviderChange}
				aspectRatio='16/9'
				load='eager'
				src={`youtube/${videoId}`}
				crossOrigin='anonymous'
				autoPlay={true}
				controls={!isStarted}
				playsInline
			>
				<MediaProvider>
					<Poster
						hidden={!isStarted}
						className='vds-poster z-50'
						src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
						alt='Girl walks into campfire with gnomes surrounding her friend ready for their next meal!'
					/>
				</MediaProvider>

				<PlyrLayout
					icons={plyrLayoutIcons}
					displayDuration
					controls={[
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
