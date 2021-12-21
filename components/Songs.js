import { nanoid } from "nanoid"
import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song"

const Songs = () => {
    const playlists = useRecoilValue(playlistState)
    return <div className="text-white flex flex-col space-y-2 pb-4">
        {
            playlists?.tracks.items.map((t, i) => (
                <Song key={nanoid()} order={i} track={t.track} />
            ))
        }
    </div>
}

export default Songs
