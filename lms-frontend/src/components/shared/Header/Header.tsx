"use client";
import { useState } from "react";
import Link from "next/link";
import { BiSolidGridAlt } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import ReusableDrawer from "@/components/ui/Drawer";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Avatar, Tooltip } from "antd";
import Swal from "sweetalert2";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/action/logoutUser";
import { UserRole } from "@/constants";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter()

  const handleSearch = () => {
    if(searchTerm){
      router.push(`/courses?searchTerm=${searchTerm}`)
    }
    setSearchTerm('');
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if(searchTerm)  handleSearch();
    }
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const [categories, setCategories] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      dispatch(logout())
      logoutUser(router)

      Swal.fire({
        title: "Success!",
        text: "Logout successfully",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        didClose: () => {
          window.location.reload()
        }
      });


    }
    catch (error) {
      console.log(error)
      Swal.close();
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }


  const NavItem = <>
    {
      user?.id ? (
        <div className="flex items-center gap-2 ">

          <li onClick={handleLogout} className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
            Logout
          </li>

          <Tooltip title={user?.email}>
            <Avatar src="https://cdn-icons-png.flaticon.com/128/552/552721.png" />
          </Tooltip>

        </div>
      )
        :
        (
          <Link href='/login' className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
            {/* <li > */}
              Login
            {/* </li> */}
          </Link>
        )
    }
  </>

  return (
    <header className="border border-b-slate-100 bg-white text-black shadow-lg">
      <nav className="container mx-auto  flex items-center py-2">
        {/* Sidebar Toggle for mobile */}

        {/* Logo */}
        <div>
          <Link href="/">
            <img
              className="max-w-[150px] lg:mr-4 cursor-pointer"
              src="/logo.png"
              alt="Site logo"
            />
          </Link>
        </div>

        <div className="px-12 xl:px-2 flex w-full items-center justify-end lg:justify-between">
          {/* Categories Dropdown */}
          <div className="hidden md:block">
            <button
              onClick={() => setCategories(!categories)}
              className="border relative rounded-full px-5 pb-3 pt-2 text-md font-semibold"
            >
              <BiSolidGridAlt className="inline mx-1 text-blue-600" />
              Explore Courses
              {categories ? (
                <MdKeyboardArrowUp className="inline" />
              ) : (
                <MdKeyboardArrowDown className="inline" />
              )}
              <ul className="absolute bg-white rounded text-start mt-6 z-10">
                {categories && (
                  <>
                    <li className="px-5 py-2 duration-200 hover:bg-blue-600 hover:text-white">
                      Business
                    </li>
                    <li className="px-5 py-2 duration-200 hover:bg-blue-600 hover:text-white">
                      Data Science
                    </li>
                    <li className="px-5 py-2 duration-200 hover:bg-blue-600 hover:text-white">
                      Art & Design
                    </li>
                    <li className="px-5 py-2 duration-200 hover:bg-blue-600 hover:text-white">
                      Marketing
                    </li>
                    <li className="px-5 py-2 duration-200 hover:bg-blue-600 hover:text-white">
                      Finance
                    </li>

                  </>
                )}
              </ul>
            </button>
          </div>

          {/* Search Box */}
          <div className="border rounded-full py-2 px-6 text-md hidden lg:block">
           {/* <form action=""> */}
           <input
            value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="outline-none text-md px-2 bg-white"
              type="text"
              // required={true}
              placeholder="Search a course..."
            />
            <button  className="text-blue-400" onClick={handleSearch}>

              <FiSearch className="inline text-md text-slate-400 duration-200 hover:text-blue-600 cursor-pointer ml-2" />
            </button>
           {/* </form> */}
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex text-md font-semibold">
            {
              user?.role===UserRole.TEACHER &&
              <Link href='/dashboard' className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
              {/* <li > */}
              Dashboard
              {/* </li> */}
            </Link>
            }
              <Link href='/courses' className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                {/* <li > */}
                  Courses
                {/* </li> */}
              </Link>
              <li className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                Earn Certificate
              </li>
              <li className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                Free Career Counselling
                <ul className="absolute hidden bg-white rounded text-black mt-5 px-5 w-48 group-hover:block z-10">
                  <li className="py-1 duration-200 hover:text-blue-600 hover:translate-x-3">
                    Courses one
                  </li>
                  <li className="py-1 duration-200 hover:text-blue-600 hover:translate-x-3">
                    Courses Two
                  </li>
                  <li className="py-1 duration-200 hover:text-blue-600 hover:translate-x-3">
                    Courses Three
                  </li>
                </ul>
                <MdKeyboardArrowDown className="inline" />
              </li>
              {NavItem}
  

            </ul>
          </div>
          <div className="lg:hidden block">
            <FaBars size={30} onClick={showDrawer} />
            <ReusableDrawer
              title={
                <div className="flex justify-end">
                  <Link href="/">
                    <Image
                      width={200}
                      height={200}
                      className="max-w-[150px] lg:mr-4 cursor-pointer"
                      src="/logo.png"
                      alt="Site logo"
                    />
                  </Link>
                </div>
              }
              open={open}
              onClose={onClose}
            >
              <ul className=" text-md font-semibold grid grid-cols-1">
              <Link href='/courses' className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                  Courses
              </Link>
                <li className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                  Tutor
                </li>
                <li className="mx-2 py-3 hover:text-blue-600 cursor-pointer relative group">
                  Earn Certificate
                </li>

                {NavItem}
              </ul>
            </ReusableDrawer>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
