import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
const Sidebar = () => {
    const spotifyApi = useSpotify()
    const { data: session, status } = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)
    useEffect(() => {
        if (session && spotifyApi.getAccessToken) {
            spotifyApi.getUserPlaylists()
            .then((data) => setPlaylists(data.body.items))
        }
    }, [spotifyApi, session])
    return <div className='text-gray-500 p-5 text-xs lg:text-sm border-gray-900 border-r overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36'>
        <div className='space-y-4'>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HomeIcon className='h-5 w-5' /> <p>Home</p> 
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <SearchIcon className='h-5 w-5' /> <p>Search</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white' >
                <LibraryIcon className='h-5 w-5' /> <p>Your library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900' />
            <button className='flex items-center space-x-2 hover:text-white' >
                <PlusCircleIcon className='h-5 w-5' /> <p>Create playlist</p>
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <HeartIcon className='h-5 w-5' /> <p>Liked songs</p> 
            </button>
            <button className='flex items-center space-x-2 hover:text-white'>
                <RssIcon className='h-5 w-5' /> <p>Your episodes</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900' />

            {/* Playlist  */}
            {
                playlists?.map(p => (
                    <p key={p.id} onClick={() => setPlaylistId(p.id)} className={'cursor-pointer hover:text-white ' + (p.id === playlistId && 'text-white')}>{p.name}</p>
                )) 
            }
            
        </div>
    </div>
}

export default Sidebar
