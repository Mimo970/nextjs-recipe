// import React, { useEffect, useState, useContext } from "react";
// // import { getAllPostIds, getPostData } from "../../lib/posts";

// function Cuisine() {
//   const [cuisine, setCuisine] = useState([]);

//   useEffect(() => {
//     getData(params.type);
//   }, [params.type]);

//   async function getData(type) {
//     let localCuisine = localStorage.getItem(params.type);
//     if (localCuisine) {
//       setCuisine(JSON.parse(localCuisine));
//     } else {
//       let response = await fetch(
//         `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${type}&number=12`
//       );
//       let responseJSON = await response.json();
//       let responseRecipes = responseJSON.results;
//       setCuisine(responseRecipes);
//       localStorage.setItem(params.type, JSON.stringify(responseRecipes));
//     }
//   }

//   return (
//     <>
//       {someMatches && <h1 className="mobile-title">{params.type}</h1>}

//       <div id="container">
//         {cuisine.map((item) => {
//           return (
//             <div
//               className={`wrapper ${
//                 isDarkModeOn ? "dark-cuisine-searched-wrapper" : ""
//               }`}
//               key={item.id}
//             >
//               <div className="card">
//                 <img
//                   className="img"
//                   src={item.image}
//                   alt={params.type + "food"}
//                 />
//                 <Link id="title" to={"/recipe/" + item.id}>
//                   <b>{item.title}</b>
//                 </Link>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Cuisine;

// export async function getStaticPaths() {
//   const categories = await fetch(
//     `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=20`
//   ).then((res) => res.json());
//   return {
//     paths: categories.map((cat) => {
//       const categoryId = cat.name.toLowerCase().replace(/ /g, "-");
//       return {
//         params: {
//           categoryId,
//         },
//       };
//     }),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const category = params.characterId.replace(/\-/g, "+");
//   const results = await fetch(
//     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${category}&number=12`
//   ).then((res) => res.json());
//   return {
//     props: {
//       category: results[0],
//     },
//   };
// }
// import { getStaticPaths, getStaticProps } from "next";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

function Cuisine({ cuisine }) {
  const router = useRouter();
  const { category } = router.query;

  // console.log(category);

  return (
    <>
      {/* <Layout>
        <div className="p-4">
          <span className="text-3xl ">{category}</span>
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
            {cuisine.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="bg-[#212124] h-full rounded-lg shadow-md relative max-w-sm"
                >
                  <Link legacyBehavior href={"recipe/" + item.id}>
                    <a className="aspect-w-1 aspect-h-1 block rounded-t-lg overflow-hidden">
                      <img
                        className="object-cover w-full "
                        src={item.image}
                        alt={item.title}
                      />
                    </a>
                  </Link>
                  <div className="p-4">
                    <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M13.579 10.17a.5.5 0 01.707.707l-4.096 4.096a.5.5 0 01-.707 0L5.714 9.178a.5.5 0 01.707-.707l3.158 3.158 3.98-3.98z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm">View Recipe</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout> */}
      <Layout>
        <div className="p-4 grid grid-cols-1 mt-24">
          <span className="text-3xl font-semibold col-span-fll text-center mb-4">
            {category}{" "}
          </span>

          {/* <span className="text-3xl font-semibold col-start-1 row-start-1">
            {category}
          </span> */}
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center col-start-1 row-start-2">
            {cuisine.map((item) => {
              console.log(item);
              return (
                <div
                  key={item.id}
                  className="bg-[#212124] h-full rounded-lg shadow-md relative max-w-sm"
                >
                  <Link legacyBehavior href={"recipe/" + item.id}>
                    <a className="aspect-w-1 aspect-h-1 block rounded-t-lg overflow-hidden">
                      <img
                        className="object-cover w-full "
                        src={item.image}
                        alt={item.title}
                      />
                    </a>
                  </Link>
                  <div className="p-4">
                    <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-600 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M13.579 10.17a.5.5 0 01.707.707l-4.096 4.096a.5.5 0 01-.707 0L5.714 9.178a.5.5 0 01.707-.707l3.158 3.158 3.98-3.98z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-600 text-sm">View Recipe</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cuisine;

export async function getStaticProps({ params }) {
  const { category } = params;
  const results = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${category}&number=12`
  ).then((res) => res.json());
  return {
    props: {
      cuisine: results.results,
    },
  };
}

export async function getStaticPaths() {
  const cuisines = [
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

  // const cuisines = await fetch(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${category}&number=12`
  // ).then((res) => res.json());

  return {
    paths: cuisines.map((cuisine) => ({
      params: {
        category: cuisine,
      },
    })),
    fallback: false,
  };
}
