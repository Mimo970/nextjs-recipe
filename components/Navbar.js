import React, { useContext, useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
// import Hamburger from "hamburger-react";
import { Sling as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AuthContext } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import CustomDropdown from "../components/CustomDropdown";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { theme, setTheme } = useTheme();

  const [visible, setVisible] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const foodCategories = [
    "Italian",
    "Chinese",
    "American",
    "Thai",
    "Japanese",
    "Mexican",
    "Greek",
    "Indian",
    "German",
  ];
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  // console.log(currentUser);

  return (
    // <nav
    //   className={`${
    //     visible ? "" : "hidden"
    //   } bg-[#242526] py-4 border-b border-b-gray-900 transition duration-500 ease-in-out  top-0 w-full fixed  z-10`}
    // >
    <>
      <nav
        className={`${visible ? "" : "top-44"} z-50 fixed w-full top-0 ${
          theme === "dark"
            ? "bg-[#181818] shadow-md"
            : "bg-zinc-300 border-none shadow-md"
        }  py-4 border-b border-b-gray-900 transition-all duration-500 ease-in-out`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href={"/"}>
              <span
                className={`no-underline ${
                  theme === "dark" ? "text-zinc-300" : "text-black"
                } font-semibold text-2xl ml-2 `}
              >
                RecipeFinder
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="mr-6">
              <input
                className={`rounded-full py-2 px-4 ${
                  theme === "dark"
                    ? "bg-zinc-700 text-zinc-400"
                    : "bg-zinc-100 text-black"
                } text-black focus:outline-none`}
                type="search"
                name="search"
                placeholder="Search"
              />
            </div>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`${
                theme === "dark"
                  ? " bg-[#181818] hover:bg-zinc-700 border-2 border-zinc-700"
                  : " bg-zinc-300 hover:bg-zinc-400  border-2 border-[#000000]"
              }   text-white p-1 rounded`}
            >
              {theme === "dark" ? (
                <MdOutlineLightMode
                  color={theme === "dark" ? "#52525b" : "#023020"}
                  size={25}
                />
              ) : (
                <MdOutlineDarkMode
                  color={theme === "dark" ? "#52525b" : "#023020"}
                  size={25}
                />
              )}
            </button>
            <div className="md:hidden">
              <Hamburger
                rounded
                toggled={isOpen}
                toggle={setIsOpen}
                size={20}
                color={theme === "dark" ? "#52525b" : "#023020"}
              />
            </div>
            <div className="px-2 cursor-pointer">
              <CustomDropdown user={currentUser}></CustomDropdown>
              {/* <img
                className="w-12 rounded-full"
                src={currentUser.photoURL}
                alt=""
              /> */}
              {/* <button onClick={handleSignOut}>Sign Out</button> */}
            </div>
          </div>
        </div>

        <div
          className={` ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"}   ${
            isOpen ? "block " : "hidden"
          } md:hidden bg-[#242526] px-4 py-2`}
        >
          {foodCategories.map((category) => (
            <Link legacyBehavior href={`/${category}`} key={category}>
              <a className="block text-black text-lg py-2">{category}</a>
            </Link>
          ))}
        </div>

        <div className=" hidden md:block container mx-auto flex justify-center">
          {foodCategories.map((category) => (
            <Link legacyBehavior href={`/${category}`} key={category}>
              <a
                className={`${
                  theme === "dark" ? "text-zinc-400" : "text-black"
                } text-lg mx-4`}
              >
                {category}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
// return (
// className="bg-[#242526] py-4 border-b border-b-gray-900"
//     <nav
//       className={`fixed w-full transition duration-500 ease-in-out ${
//         isScrolled ? "bg-[#242526] py-2 shadow-lg" : "py-4"
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           <Link href={"/"}>
//             <span className="text-white font-semibold text-lg ml-2">
//               RecipeFinder
//             </span>
//           </Link>
//         </div>
//         <div className="flex items-center">
//           <div className="mr-6">
//             <input
//               className="rounded-full py-2 px-4 bg-[#4F4E51] text-white focus:outline-none"
//               type="search"
//               name="search"
//               placeholder="Search"
//             />
//           </div>
//           <button className="bg-[#4F4E51] hover:bg-[#78777A] text-white py-2 px-4 rounded">
//             <MdOutlineLightMode />
//           </button>
//           <div className="md:hidden">
//             <Hamburger
//               rounded
//               toggled={isOpen}
//               toggle={setIsOpen}
//               size={20}
//               color="#ffffff"
//             />
//           </div>
//         </div>
//       </div>

//       <div
//         className={`${
//           isOpen ? "block" : "hidden"
//         } md:hidden bg-[#242526] px-4 py-2`}
//       >
//         {foodCategories.map((category) => (
//           <Link legacyBehavior href={`/${category}`} key={category}>
//             <a className="block text-white text-lg py-2">{category}</a>
//           </Link>
//         ))}
//       </div>

//       <div className="hidden md:block container mx-auto flex justify-center">
//         {foodCategories.map((category) => (
//           <Link legacyBehavior href={`/${category}`} key={category}>
//             <a className="text-white text-lg mx-4">{category}</a>
//           </Link>
//         ))}
//       </div>
//     </nav>
//   );
// };

export default Navbar;
