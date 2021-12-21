import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../hooks/useSpotify"
import { millisTominutesAndSeconds } from "../lib/time"

const Song = ({ track, order }) => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const isSelected = currentTrackId === track?.id
    const playSong = async () => {
        setCurrentTrackId(track.id)
        setIsPlaying(true)
        spotifyApi.play({
            uris: [track.uri]
        })
    }
    return ( 
        <div onClick={playSong} className={"grid grid-cols-2 text-gray-500 py-4 px-4 hover:bg-gray-900 rounded-lg m-2 cursor-pointer " + (isSelected && 'bg-gray-900')}>
            <div className="flex items-center space-x-2">
                <p>{order+1}</p>
                <img src={track?.album.images[0].url} alt="image track" className="h-10 w-10" />
                <div>
                    <p className="w-36 lg:w-64 truncate text-white">{track?.name}</p>
                    <p className="w-40">{track?.artists[0].name}</p>
                </div>
            </div>
            <div className="flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline">{track?.album.name}</p>
                <p>{millisTominutesAndSeconds(track?.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song
