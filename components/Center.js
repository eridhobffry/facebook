import { ChevronDownIcon } from "@heroicons/react/outline"
import { shuffle } from "lodash"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playlistState, playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"
import { signOut } from 'next-auth/react'

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = () => {
    const { data: session } = useSession()
    const [color, setColor] = useState(null)
    const spotifyApi = useSpotify()
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])
    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
            .then((data) => setPlaylist(data.body))
        .catch((err) => console.log("something went wrong", err))
    }, [session, spotifyApi, playlistId])
    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center rounded-full bg-black space-x-3 opacity-90 hover:opacity-75 cursor-pointer p-1 pr-2" onClick={() => signOut()}>
                    <img className="rounded-full h-10 w-10" src={session?.user.image} alt="" />
                    <h2 className="text-white">
                        {session?.user.name}
                    </h2>
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white h-80 p-8`}>
                <img src={playlist?.images[0]?.url} className="h-44 w-44 shadow-2xl" alt='logo playlist' />
                <div>
                    <p>
                        PLAYLIST
                    </p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                        {playlist?.name}
                    </h1>
                </div>
            </section>
            <Songs />
        </div>
    )
}

export default Center
