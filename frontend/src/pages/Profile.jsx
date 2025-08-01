import { Card } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import React, { useState } from 'react'
import userLogo from "../assets/user.jpg"
import { Link } from 'react-router-dom'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setLoading, setUser } from '../redux/authSlice'
import axios from 'axios'
import { toast } from 'sonner'

const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        occupation: user?.occupation,
        bio: user?.bio,
        facebook: user?.facebook,
        linkedin: user?.linkedin,
        github: user?.github,
        instagram: user?.instagram,
        file: user?.photoUri

    })

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const dispatch = useDispatch();

        const formData = new FormData();
        formData.append("firstName", input.firstName)
        formData.append("lastName", input.lastName)
        formData.append("bio", input.bio)
        formData.append("occupation", input.occupation)
        formData.append("facebook", input.facebook)
        formData.append("instagram", input.instagram)
        formData.append("linkedin", input.linkedin)
        formData.append("github", input.github)
        if (input?.file) {
            formData.append("file", input?.file)
        }
        console.log(input);
        try {
            dispatch(setLoading(true))
            const res = await axios.put(`http://localhost:8000/api/v1/user/profile/update`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                dispatch(setUser(res.data.user))
            }
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false))
        }
    }
    return (
        <div className='pt-20 md:ml-[320px] md:h-screen'>
            <div className='max-w-6xl mx-auto mt-8'>
                <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
                    {/*image section*/}
                    <div className='flex flex-col items-center justify-center md:w-[400px]'>
                        <Avatar className='w-40 h-40 border-2'>
                            <AvatarImage src={user?.photoUri || userLogo} />
                        </Avatar>
                        <h1 className='text-center font-semibold text-x1 text-gray-700 dark:text-gray-300 my-3'>{user.occupation || "Mern Stack Developer"}</h1>
                        <div className='flex gap-4 items-center'>
                            <Link><FaFacebook className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaLinkedin className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaGithub className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                            <Link><FaInstagram className='w-6 text-gray-800 dark:text-gray-300' /></Link>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-center md:twext-start text-4xl mb-7'>Welcome {user.firstName || "User"}</h1>
                        <p><span className='font-semibold'>Email :</span> {user.email}</p>
                        <div className='felx flex-col gap-2 items-start ju8stify-start my-5'>
                            <Label>About Me</Label>
                            <p className='border dark:border-gray-600 p-6 rounded-lg'>{user.bio || "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed aliquam, adipisci reprehenderit, quam porro, voluptates sit consequuntur quasi tenetur repudiandae eligendi iste facilis. Quam, vero voluptatem amet porro beatae officia."}</p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Edit Profile</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Edit profile</DialogTitle>
                                    <DialogDescription className="text-center">
                                        Make changes to your profile here.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4">
                                    <div className='flex gap-2'>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">First Name</Label>
                                            <Input
                                                id="name-1"
                                                name="firstName"
                                                placeholder="firstName"
                                                type="text"
                                                className="col-span-3 text-gray-500"
                                                value={input.firstName}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-2">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="lastName"
                                                type="text"
                                                className="col-span-3 text-gray-500"
                                                value={input.lastName}
                                                onChange={changeEventHandler}
                                            />
                                        </div>

                                    </div>

                                    <div className='flex gap-2'>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Facebook</Label>
                                            <Input id="facebook" name="facebook" type="text"
                                                placeholder="Enter a URL" className="col-span-3 text-gray-500"
                                                value={input.facebook}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-2">Instagram</Label>
                                            <Input id="instagram" name="instagram" type="text"
                                                placeholder="Enter a URL"
                                                className="col-span-3 text-gray-500"
                                                value={input.instagram}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                    </div>

                                    <div className='flex gap-2'>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-1">Linkedin</Label>
                                            <Input id="linkedin" name="linkedin" type="text" placeholder="Enter a URL"
                                                className="col-span-3 text-gray-500"
                                                value={input.linkedin}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name-2">Github</Label>
                                            <Input id="github" name="github" type="text"
                                                placeholder="Enter a URL"
                                                className="col-span-3 text-gray-500"
                                                value={input.github}
                                                onChange={changeEventHandler}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className='text-right'>Decription</Label>
                                        <Textarea id="bio" name="bio" placeholder="Enter description" className="col-span-3 text-gray-500"
                                            value={input.bio}
                                            onChange={changeEventHandler}
                                        />
                                    </div>

                                    <div>
                                        <Label className='text-right'>Picture</Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            accept="image/*"
                                            className="w-[277px]"
                                            onChange={changeFileHandler} />
                                    </div>

                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button onClick={submitHandler}
                                        type="submit">Save changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </Card>
            </div >
        </div >
    )
}

export default Profile
