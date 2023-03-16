// import { AuthContext } from "contexts/AuthContext";
// import { db, storage, auth } from "../../firebase";
// import {
//   getDocFromCache,
//   doc,
//   updateDoc,
//   getDoc,
//   setDoc,
//   onSnapshot,
// } from "firebase/firestore";
// import { useRouter } from "next/router";
// import React, { useContext, useEffect, useState } from "react";
// import { MdOutlineCancel } from "react-icons/md";
// import Layout from "../../components/Layout";

// const MyAccount = () => {
//   const { currentUser } = useContext(AuthContext);

//   const router = useRouter();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [img, setImg] = useState(null);

//   const notify = () =>
//     toast.success("Profile Updated!", {
//       duration: 4000,
//       position: "top-right",

//       ariaProps: {
//         role: "status",
//         "aria-live": "polite",
//       },
//     });

//   const backtoHome = (e) => {
//     e.preventDefault();

//     router.push("/");
//   };

//   useEffect(() => {
//     let unsubscribe;
//     const getUserData = async (uid) => {
//       try {
//         const docRef = doc(db, "users", uid);
//         unsubscribe = onSnapshot(docRef, (docSnap) => {
//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//             console.log("data has been set!");
//           } else {
//             console.log("No such document!");
//             setUserData(null);
//           }
//         });
//       } catch (error) {
//         console.log("Error fetching user data: ", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const authUnsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         getUserData(user.uid);
//       } else {
//         setUserData(null);
//         setLoading(false);
//       }
//     });

//     return () => {
//       authUnsubscribe();
//       if (unsubscribe) {
//         unsubscribe();
//       }
//     };
//   }, []);

//   return (
//     <Layout>
//       <div className="pt-48 bg-zinc-700 h-screen  ">
//         <div className=" flex flex-col max-w-4xl mx-auto bg-zinc-800 p-4 rounded-lg">
//           <div className="flex justify-between">
//             <h1 className="text-3xl text-zinc-400 font-bold mb-4">
//               My Account
//             </h1>
//             <span className="cursor-pointer" onClick={backtoHome}>
//               <div className="flex flex-col items-center">
//                 <MdOutlineCancel size={40} />
//                 <span>ESC</span>
//               </div>
//             </span>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4  ">
//             <div className="w-full md:w-1/4">
//               <h1 className="text-lg font-bold text-zinc-400">Preview</h1>
//               <div className="border rounded p-4">
//                 <img
//                   className="rounded-full w-11 h-11 object-center"
//                   src={currentUser.photoURL}
//                   alt=""
//                 />

//                 <div className="mt-4">
//                   <h2 className="text-lg text-zinc-400 font-bold">Username</h2>
//                   <p className="text-gray-500">@{currentUser.displayName}</p>
//                 </div>
//                 <div className="mt-4">
//                   <h2 className="text-lg text-zinc-400 font-bold">Email</h2>
//                   <p className="text-zinc-500">{currentUser.email}</p>
//                 </div>
//               </div>
//             </div>
//             <div className="w-full md:w-3/4">
//               <h2 className="text-lg font-bold mb-2 text-zinc-400">
//                 {userData?.email}
//               </h2>
//               <div className="border rounded p-4 flex flex-col gap-10">
//                 <div>
//                   <div className="flex "></div>
//                 </div>
//                 <div></div>
//                 <div>
//                   <h1 className="text-zinc-400">About Me</h1>
//                   <div>
//                     {userData?.favoriteRecipes.map((recipe) => (
//                       <div key={recipe.id}>{recipe.title}</div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button
//             // onClick={handleSave}
//             className="self-end mt-3 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default MyAccount;

import { useState, useEffect, useContext } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import Layout from "../../components/Layout";
import { MdOutlineCancel } from "react-icons/md";
import { useTheme } from "next-themes";
import { Router, useRouter } from "next/router";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLike,
  AiOutlineMinusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import Link from "next/link";
import { FavoriteRecipesContext } from "../../contexts/FavoritesContext";

const Profile = () => {
  const [userFavoriteRecipes, setUserFavoriteRecipes] = useState([]);
  const [clickedRecipes, setClickedRecipes] = useState([]);
  const { favoriteRecipes, setFavoriteRecipes } = useContext(
    FavoriteRecipesContext
  );
  const { currentUser } = useContext(AuthContext);
  const { theme, setTheme } = useTheme();
  const Router = useRouter();

  const backtoHome = (e) => {
    e.preventDefault();

    Router.push("/");
  };

  const fetchFavoriteRecipes = async (uid) => {
    if (uid) {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFavoriteRecipes(docSnap.data().favoriteRecipes);
      } else {
        console.log("No such document!");
      }
    }
  };
  useEffect(() => {
    fetchFavoriteRecipes(currentUser.uid);
  }, []);

  const updateFavoriteRecipes = async (userId, favoriteRecipes) => {
    await updateDoc(doc(db, "users", currentUser.uid), {
      // date: Timestamp.now(),
      favoriteRecipes: favoriteRecipes,
    })
      .then(() => {
        console.log("Favorite recipes updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating favorite recipes: ", error);
      });
  };

  const handleFavorite = (recipeId) => {
    const favoriteRecipe = favoriteRecipes.find(
      (recipe) => recipe.id === recipeId
    );
    const isFavorited = favoriteRecipes.some(
      (recipe) => recipe.id === recipeId
    );
    if (!isFavorited) {
      setClickedRecipes((prevState) => [...prevState, recipeId]);
      setFavoriteRecipes((prevState) => [...prevState, favoriteRecipe]);
      updateFavoriteRecipes(currentUser.uid, [
        ...favoriteRecipes,
        favoriteRecipe,
      ]);
    } else {
      setClickedRecipes((prevState) =>
        prevState.filter((id) => id !== recipeId)
      );
      setFavoriteRecipes((prevState) =>
        prevState.filter((recipe) => recipe.id !== recipeId)
      );
      updateFavoriteRecipes(
        currentUser.uid,
        favoriteRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    }
  };

  console.log(favoriteRecipes);

  return (
    <Layout>
      <div
        className={`pt-48   
        ${theme === "dark" ? "bg-[#242526]" : "bg-zinc-200 "}
        min-h-full  pb-12 `}
      >
        <div
          className={` flex flex-col max-w-7xl mx-auto  ${
            theme === "dark" ? "bg-zinc-700" : "bg-zinc-300 "
          } p-4 rounded-lg  min-h-screen `}
        >
          <div className="flex justify-between">
            <h1
              className={`text-3xl ${
                theme === "dark" ? "text-zinc-300" : " "
              }  font-bold mb-4`}
            >
              My Account
            </h1>
            <span className="cursor-pointer" onClick={backtoHome}>
              <div className="flex flex-col items-center">
                <MdOutlineCancel color="gray" size={40} />
                <span>ESC</span>
              </div>
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-4  ">
            <div className="w-full md:w-1/4">
              <h1
                className={`text-lg font-bold  ${
                  theme === "dark" ? "text-zinc-300" : " "
                }`}
              >
                Preview
              </h1>
              <div
                className={` ${
                  theme === "dark"
                    ? "border-2 rounded border-zinc-500"
                    : "border-2 rounded border-zinc-400"
                } p-4`}
              >
                <img
                  className="rounded-full w-11 h-11 object-center"
                  src={currentUser.photoURL}
                  alt=""
                />

                <div className="mt-4">
                  <h2
                    className={`text-lg ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-700 "
                    } font-bold`}
                  >
                    Username
                  </h2>
                  <p className="text-gray-500">@{currentUser.displayName}</p>
                </div>
                <div className="mt-4">
                  <h2
                    className={`text-lg ${
                      theme === "dark" ? "text-zinc-400" : "text-zinc-700 "
                    } font-bold`}
                  >
                    Email
                  </h2>
                  <p className="text-zinc-500">{currentUser.email}</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/4">
              <div
                className={`${
                  theme === "dark"
                    ? "border-2 rounded border-zinc-500"
                    : "border-2 rounded border-zinc-400"
                } p-4 flex h-screen flex-col gap-10`}
              >
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-zinc-300" : " "
                  }`}
                >
                  All Saved Recipes
                </h2>
                <div>
                  <h1 className={`${theme === "dark" ? "text-zinc-300" : " "}`}>
                    {favoriteRecipes.length} item
                    {favoriteRecipes.length > 1 || favoriteRecipes < 1
                      ? "s"
                      : ""}
                  </h1>
                  <div>
                    {/* {favoriteRecipes.map((recipe) => (
                      <div key={recipe.id}>
                        <h2 className="text-zinc-400">{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <img
                          className="w-14 h-12"
                          src={recipe.image}
                          alt={recipe.title}
                        />
                      </div>
                    ))} */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {favoriteRecipes.map((item) => {
                        {
                          /* const isFavorited = userFavoriteRecipes.some(
                          (recipe) => recipe.id === item.id
                        ); */
                        }

                        return (
                          <div
                            key={item.id}
                            className={`${
                              theme === "dark" ? "bg-zinc-900" : "bg-zinc-200"
                            } rounded-lg shadow-md p-2 relative w-full`}
                          >
                            <img
                              className="object-cover w-full h-48 rounded-t-lg"
                              src={item.image}
                              alt={item.title}
                            />
                            <span
                              className="absolute top-2 rounded-full right-2 bg-red-500 cursor-pointer"
                              onClick={() => handleFavorite(item.id)}
                            >
                              <AiFillMinusCircle size={30} color="white" />
                            </span>
                            <div className="p-4">
                              <Link href={"recipe/" + item.id}>
                                <h4
                                  className={`${
                                    theme === "dark" ? "text-zinc-300" : " "
                                  } text-lg font-medium mb-2`}
                                >
                                  {item.title}
                                </h4>
                              </Link>
                              <div className="flex items-center">
                                <AiOutlineLike
                                  color={
                                    theme === "dark" ? "#52525b" : "#023020"
                                  }
                                />
                                &nbsp;
                                <span
                                  className={`${
                                    theme === "dark" ? "text-zinc-300" : " "
                                  } text-sm`}
                                >
                                  {item.aggregateLikes} likes
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> */}
                    {/* {favoriteRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="bg-zinc-900 rounded-lg shadow-md py-1 px-2 flex flex-col justify-between"
                        >
                          <div className="self-end cursor-pointer">
                            <AiOutlineMinusCircle size={25} color="red" />
                          </div>

                          <div>
                            <img
                              className="w-full h-32 object-cover mt-1"
                              src={recipe.image}
                              alt={recipe.title}
                            />
                            <h2 className="text-lg font-medium text-zinc-400">
                              {recipe.title}
                            </h2>
                            <span
                              className={`${
                                theme === "dark" ? "text-zinc-400" : " "
                              } text-sm `}
                            >
                              {recipe.aggregateLikes} Likes
                            </span>
                          </div>
                        </div>
                      ))} */}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <button
            // onClick={handleSave}
            className="self-end mt-3 bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-1.5 px-3 rounded"
          >
            Save Changes
          </button> */}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
