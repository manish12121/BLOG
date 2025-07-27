import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import userLogo from "../assets/user.jpg"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '@radix-ui/react-dropdown-menu'

const Profile = () => {
    return (
        <div className='pt-20 md:ml-[320px] md:h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
                    {/*image section*/}
                    <div className='flex flex-col items-center justify-center md:w-[400px]'>
                        <Avatar className='w-40 h-40 border-2'>
                            <AvatarImage src={userLogo} />
                        </Avatar>
                        <h1 className='text-center font-semibold text-x1 text-gray-700 dark:text-gray-300 my-3'>Mern Stack Developer</h1>
                        <div className='flex gap-4 items-center'>
                            <Link><FaFacebook className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaLinkedin className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaGithub className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaInstagram className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-center md:twext-start text-4xl mb-7'>Welcome User</h1>
                        <p><span className='font-semibold'>Email :</span>manish@gmail.com</p>
                        <div className='felx flex-col gap-2 items-start ju8stify-start my-5'>
                            <Label>About Me</Label>
                            <p className='border dark:border-gray-600 p-6 rounded-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam, adipisci reprehenderit, quam porro, voluptates sit consequuntur quasi tenetur repudiandae eligendi iste facilis. Quam, vero voluptatem amet porro beatae officia.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Profile
