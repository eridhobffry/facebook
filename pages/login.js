import { getProviders, signIn } from 'next-auth/react'

const Login = ({ providers }) => {
    return (
        <div className='flex flex-col items-center bg-black min-h-screen justify-center'>
            <img className='w-52 mb-5' src='https://links.papareact.com/9xl' alt='spotify logo' />
            {
                Object.values(providers).map((p) => {
                    return <div key={p.name}>
                        <button onClick={() => signIn(p.id, { callbackUrl: '/' })} className='bg-[#18D860] text-white px-16 rounded-lg py-6'>
                            Login with {p.name}
                        </button>
                    </div>
                })
            }
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}