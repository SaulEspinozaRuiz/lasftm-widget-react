import { useCallback, useEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';
import jamgif from './assets/jam.gif';

const LASTFM_URL =
	'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=$USER&api_key=$API_KEY&format=json&limit=1';
const MSS = 2000;
const MSC = 1200;
const user = import.meta.env.VITE_LASTFM_USER;
const api = import.meta.env.VITE_LASTFM_API;

const App = () => {
	const info = useRef(null);
	const title = useRef(null);
	const [track, setTrack] = useState({ name: '', album: '', artist: '', cover: '' });
	const [useMarquee, setUseMarquee] = useState(false);

	const getRecentTracks = useCallback(() => {
		fetch(LASTFM_URL.replace('$USER', user).replace('$API_KEY', api))
			.then((res) => res.json())
			.then((data) => {
				if (!data.recenttracks.track[1]) return;
				const requestedTrack = {
					name: data.recenttracks.track[0].name,
					album: data.recenttracks.track[0].album['#text'],
					artist: data.recenttracks.track[0].artist['#text'],
					cover: data.recenttracks.track[0].image[3]['#text'],
				};
				if (
					requestedTrack.cover ===
					'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png'
				) {
					requestedTrack.cover = '';
				}
				if (requestedTrack.name !== track.name) {
					return changeCurrentSong(requestedTrack);
				}
			});
	}, [track]);

	useEffect(() => {
		getRecentTracks();
		const interval = setInterval(() => {
			getRecentTracks();
		}, MSS);
		return () => clearInterval(interval);
	}, [track, getRecentTracks]);

	const changeCurrentSong = (newSong) => {
		info.current.style = 'margin-left: -100%;';
		setTimeout(() => {
			setTrack(newSong);
			info.current.style = 'margin-left: 0;';
		}, MSC);
	};

	useEffect(() => {
		if (track.name) {
			if (track.name.length > 12) {
				setUseMarquee(true);
			} else {
				setUseMarquee(false);
			}
		}
	}, [track.name]);

	return (
		<div className='widget'>
			<img
				className='song-img'
				height={150}
				src={track.cover || jamgif}
				alt={`cover ${track.name}`}
			/>
			<div className='song-info' ref={info}>
				{useMarquee ? (
					<Marquee gradient={false} speed={40}>
						<p ref={title} className='song-info-name'>
							{track.name}
						</p>
					</Marquee>
				) : (
					<p ref={title} className='song-info-name'>
						{track.name}
					</p>
				)}
				<p className='song-info-album'>{track.album}</p>
				<p className='song-info-artist'>{track.artist}</p>
				<img
					className='song-info-cover'
					src={track.cover || jamgif}
					alt={`cover ${track.name}`}
				/>
			</div>
		</div>
	);
};

export default App;
