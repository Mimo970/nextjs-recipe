import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";

const Recipe = ({ recipe }) => {
  const [details, setDetails] = useState(recipe);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=4badb335b6834767934dec71cd7f31aa`
      );
      const detailData = await data.json();
      setDetails(detailData);
    };
    fetchDetails();
  }, [id]);

  console.log(details);

  return (
    <Layout>
      <div className="bg-[#212124] p-4 mt-24">
        <div className="bg-[#212124] container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{details?.title}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-2">Summary</h3>
              <p
                className=" text-gray-400"
                dangerouslySetInnerHTML={{ __html: details?.summary }}
              ></p>
            </div>
            <div className="flex justify-center my-4">
              <img
                className="w-half max-w-xl h-auto object-contain"
                src={details?.image}
                alt=""
              />
            </div>
            <div className="pb-4">
              <div className="flex items-center mb-2">
                <p className="text-lg font-bold mr-2">Ready In:</p>
                <p className="text-lg">{details?.readyInMinutes} Minutes</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Ingredients</h3>
                <ul>
                  {details?.extendedIngredients?.map((ingredient) => {
                    return (
                      <li key={ingredient.id} className="mb-1 text-gray-400">
                        {ingredient.original}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Instructions</h3>
                <div
                  className="text-gray-400"
                  dangerouslySetInnerHTML={{ __html: details?.instructions }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipe;

// export const getStaticPaths = async () => {
//   const recipeFiles = fs.readdirSync("pages/recipe");
//   const recipeIds = recipeFiles.map((file) => file.replace(/\.js$/, ""));
//   const paths = recipeIds.map((id) => ({ params: { id } }));
//   return { paths, fallback: false };
// };

// export const getStaticProps = async ({ params }) => {
//   const { id } = params;
//   const res = await fetch(
//     `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
//   );
//   const recipe = await res.json();
//   return { props: { recipe } };
// };
