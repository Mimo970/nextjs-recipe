// import Link from "next/link";
// import React, { useState } from "react";
// import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
// import Hamburger from "hamburger-react";

// const Navbar = () => {
//   const foodCategories = [
//     "Italian",
//     "Chinese",
//     "American",
//     "Thai",
//     "Japanese",
//     "Mexican",
//     "Greek",
//     "Indian",
//     "German",
//   ];

//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="bg-[#242526] py-4 border-b border-b-gray-900">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           {/* <ismg className="h-8 w-8" src="/logo.svg" alt="Logo" /> */}
//           <Link href={"/"}>
//             <span className="text-white font-semibold text-lg ml-2">
//               RecipeFinder
//             </span>
//           </Link>
//         </div>
//         <div className="hidden md:flex items-center">
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
//             {/* <MdOutlineDarkMode /> */}
//           </button>
//         </div>
//         <div className="md:hidden">
//           <Hamburger toggled={isOpen} toggle={handleToggle} />
//         </div>
//       </div>
//       {isOpen ? (
//         <div className="container mx-auto">
//           <div className="flex flex-col items-center">
//             {foodCategories.map((category) => (
//               <Link legacyBehavior href={`/${category}`} key={category}>
//                 <a className="text-white text-lg my-4">{category}</a>
//               </Link>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="container mx-auto">
//           <div className="container mx-auto flex justify-center">
//             {foodCategories.map((category) => (
//               <Link legacyBehavior href={`/${category}`} key={category}>
//                 <a className="text-white text-lg my-4 m-6">{category}</a>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import Hamburger from "hamburger-react";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { theme, setTheme } = useTheme();

  const [visible, setVisible] = useState(true);

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
  return (
    // <nav
    //   className={`${
    //     visible ? "" : "hidden"
    //   } bg-[#242526] py-4 border-b border-b-gray-900 transition duration-500 ease-in-out  top-0 w-full fixed  z-10`}
    // >
    <nav
      className={`${
        visible ? "" : "-top-40"
      } z-50 fixed w-full top-0 bg-[#242526] py-4 border-b border-b-gray-900 transition-all duration-500 ease-in-out`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href={"/"}>
            <span className="text-white font-semibold text-lg ml-2">
              RecipeFinder
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="mr-6">
            <input
              className="rounded-full py-2 px-4 bg-[#4F4E51] text-white focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-[#4F4E51] hover:bg-[#78777A] text-white py-2 px-4 rounded"
          >
            <MdOutlineLightMode></MdOutlineLightMode>
          </button>
          <div className="md:hidden">
            <Hamburger
              rounded
              toggled={isOpen}
              toggle={setIsOpen}
              size={20}
              color="#ffffff"
            />
          </div>
        </div>
      </div>

      <div
        className={`   ${
          isOpen ? "block " : "hidden"
        } md:hidden bg-[#242526] px-4 py-2`}
      >
        {foodCategories.map((category) => (
          <Link legacyBehavior href={`/${category}`} key={category}>
            <a className="block text-white text-lg py-2">{category}</a>
          </Link>
        ))}
      </div>

      <div className=" hidden md:block container mx-auto flex justify-center">
        {foodCategories.map((category) => (
          <Link legacyBehavior href={`/${category}`} key={category}>
            <a className="text-white text-lg mx-4">{category}</a>
          </Link>
        ))}
      </div>
    </nav>
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
