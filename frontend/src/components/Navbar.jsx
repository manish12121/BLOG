import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.png"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ChartColumnBig, LogOut, Search, User } from 'lucide-react'
import { FaMoon, FaRegEdit, FaSun } from "react-icons/fa";
import { Avatar } from './ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { toggleTheme } from '@/redux/themeSlice'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { LiaCommentSolid, LiaCommentsSolid } from "react-icons/lia";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


function Navbar() {
  const { user } = useSelector(store => store.auth);
  const { theme } = useSelector(store => store.theme)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        toast.success(res.data.message)
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error)

    }
  }
  return (
    <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-gray-300 border-2 bg-white z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
        {/* logo section */}
        <div className='flex gap-7 items-center'>
          <Link to={'/'}>
            <div className='flex gap-2 items-center'>
              <img src={Logo} alt="" className='w-7 h-7 md:w-10 md:h-10 dark:invert' />
              <h1 className='font-bold text-3xl md:text-4xl'>Logo</h1>
            </div>
          </Link>
          <div className='relative hidden md:block' >
            <Input
              type="text"
              placeholder="search..."
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] hidden md:block"
            />
            <Button className={"absolute right-0 top-0"}><Search /></Button>
          </div>
        </div>
        {/*nav section*/}
        <nav className='flex md:gap-7 gap-4 items-center'>
          <ul className='hidden md:flex gap-7 items-center text-xl font-semibold'>
            <Link to={'/'}><li> Home</li></Link>
            <Link to={'/blogs'}><li> Blogs</li></Link>
            <Link to={'/about'}><li> About</li></Link>
          </ul>
          <div className='flex'>
            <Button onClick={() => dispatch(toggleTheme())}
            >
              {
                theme === 'light' ? <FaMoon /> : <FaSun />
              }
            </Button>
            {
              user ? <div className='ml-7 flex gap-3 items-center'>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User/>
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ChartColumnBig/>
                        <span>Your Blogs</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LiaCommentsSolid/>
                        <span>
                          Comments
                        </span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FaRegEdit/>
                        <span>Write Blogs</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut/>
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>


                <Button onClick={logoutHandler}>Logout</Button>
              </div> : <div className='ml-7 md:flex gap-2'>
                <Link to={"/login"}><Button>Login</Button></Link>
                <Link className='hidden md:block' to={"/signup"}><Button>Signup</Button></Link>
              </div>
            }
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar
