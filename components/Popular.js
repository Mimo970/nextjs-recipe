// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { AiOutlineHeart } from "react-icons/ai";
// const Popular = () => {
//   const [popularItems, setPopularItems] = useState([]);

//   useEffect(() => {
//     async function setPopularRecipes() {
//       let localRecipes = localStorage.getItem("popular");
//       if (localRecipes) {
//         let localJSON = JSON.parse(localRecipes);
//         setPopularItems(localJSON);
//       } else {
//         let response = await fetch(
//           `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`
//         );
//         let responseJson = await response.json();
//         let apiRecipies = responseJson.recipes;
//         setPopularItems(apiRecipies);
//         localStorage.setItem("popular", JSON.stringify(apiRecipies));
//       }
//     }
//     setPopularRecipes();
//   }, []);
//   // bg-[#121212]
//   return (
//     <div className="bg-[#18191A] py-8">
//       <div className="container mx-auto">
//         <h3 className="text-xl font-semibold mb-4">Popular Recipes</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {popularItems.map((item) => {
//             return (
//               <div
//                 key={item.id}
//                 className="bg-[#212124] rounded-lg shadow-md p-2"
//               >
//                 <Link href={"recipe/" + item.id}>
//                   <img
//                     className="object-cover w-full h-48 rounded-t-lg"
//                     src={item.image}
//                     alt={item.title}
//                   />
//                   <span className="absolute top-2 right-2 text-gray-500">
//                     <AiOutlineHeart />
//                   </span>

//                   <div className="p-4">
//                     <h4 className="text-lg font-medium mb-2">{item.title}</h4>
//                     <div className="flex items-center">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 text-gray-600 mr-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
//                           clipRule="evenodd"
//                         />
//                         <path
//                           fillRule="evenodd"
//                           d="M13.579 10.17a.5.5 0 01.707.707l-4.096 4.096a.5.5 0 01-.707 0L5.714 9.178a.5.5 0 01.707-.707l2.793 2.793 3.369-3.369z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span className="text-gray-600 text-sm">
//                         {item.aggregateLikes} Likes
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Popular;

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineLike } from "react-icons/ai";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    async function setPopularRecipes() {
      let localRecipes = localStorage.getItem("popular");
      if (localRecipes) {
        let localJSON = JSON.parse(localRecipes);
        setPopularItems(localJSON);
      } else {
        let response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`
        );
        let responseJson = await response.json();
        let apiRecipies = responseJson.recipes;
        setPopularItems(apiRecipies);
        localStorage.setItem("popular", JSON.stringify(apiRecipies));
      }
    }
    setPopularRecipes();
  }, []);

  return (
    <div className="bg-[#18191A] py-8 mt-24">
      <div className="container mx-auto">
        <h3 className="text-xl font-semibold mb-4">Popular Recipes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularItems.map((item) => {
            return (
              <div
                key={item.id}
                className="bg-[#212124] rounded-lg shadow-md p-2 relative"
              >
                <Link href={"recipe/" + item.id}>
                  <img
                    className="object-cover w-full h-48 rounded-t-lg"
                    src={item.image}
                    alt={item.title}
                  />
                  <span className="absolute top-3 right-3 text-gray-500">
                    <AiOutlineHeart size={25} />
                  </span>
                  <div className="p-4">
                    <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                    <div className="flex items-center">
                      <AiOutlineLike />
                      &nbsp;
                      <span className="text-gray-600 text-sm">
                        {item.aggregateLikes} Likes
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Popular;
