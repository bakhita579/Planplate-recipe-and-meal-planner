import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import { searchMeals } from "../services/mealService";
import { getCatergories } from "../services/mealService";
import { getMealByCatergory } from "../services/mealService";
import RecipeCard from "../components/Recipes/RecipesCard";


function Discover() {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [catergories, setCatergories] = useState([])
    const [selectedCatergories, setSelectedCatergories] = useState("")
    const [debouncedQuery,setDebouncedQuery]=useState("")
    const[searchQuery,setSearchQuery]= useState("")

    useEffect(() => {
            async function loadMeal() {
                try {
                    const results = await searchMeals("chicken")
                    setMeals(Array.isArray(results) ? results : results ?.meals || [])
                } catch (error) {
                    console.error("could not load recipe", error)
                    setError("Could not load recipes")
                } finally {
                    setLoading(false)
                }
            }
    
            loadMeal()
        }, [])

         useEffect(()=>{
        const timer=setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, 400);
        return()=>clearTimeout(timer)
    },[searchQuery])

        useEffect(()=>{
            let ignore = false
            async function loadCatergories() {
                try {
                   const names = await getCatergories() 
                   if(!ignore) setCatergories(names)
                } catch (error) {
                   
                    
                }
                
            }
            loadCatergories()
            return()=>{
                ignore=true
            }
        }, [])
        useEffect(()=>{
            let ignore = false
            async function fetchRecipes() {
                setLoading(true)
                setError("")
                try {
                    const term = debouncedQuery.trim()||"chicken"
                    const result = selectedCatergories
                        ? await getMealByCatergory(selectedCatergories)
                        : await searchMeals(term);

                    if (!ignore) {
                       setMeals(Array.isArray(result) ? result : result?.meals || []);
                
                    }
                } catch (error) {
                    if(!ignore){
                        setError("Failed to load recipes")
                    }
                    
                }finally{
                    if(!ignore){
                        setLoading(false)
                    }
                }
                
            }
            fetchRecipes()
            return ()=>{
                ignore=true
            }
        }, [debouncedQuery, selectedCatergories])

            
        

        function handleCatergoryClick(catergory) {
            setSelectedCatergories(catergory == selectedCatergories ? "":catergory)
            setSearchQuery("")              
            }
            function handleSearch(e) {
                setSearchQuery(e.target.value)
                setSelectedCatergories("")
            }
            
           
    
        return(
            <div className="Discover-container">
                <header className="flex justify-between items-center mb-3">
                <div className="text-gray-800 font-serif flex-wrap justify-center items-center">
                    <h1 >Discover</h1>
                    <h2 >Discover recipes</h2>
            <p>Discover new recipes</p>
            <div className=" flex items-center underline text-red-700 font-serif">
                <Link to = "/">Home</Link>
                </div>
                </div>
                </header>
                {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && meals.length === 0 && (
        <p className="text-gray-500 font-serif">No recipes found.</p>
      )}
      <div>
        <form onSubmit={(e) =>e.preventDefault()} role="search">
            <label htmlFor="search recipe" className="font-serif text-l p-3 ">Search recipes</label>
            <input id="recipe-search" type="search" value={searchQuery} onChange={handleSearch} 
            className="font-serif w-full max-w-md py-1.5 p-2 border border-black rounded-lg  focus:outline cursor"/>

        </form>
      </div>
      <ul className="Meal-card grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6" >
                {meals.map((meal) => (
                    <li key={meal.idMeal}><RecipeCard meal={meal} className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif"/></li>
                ))}
            </ul>
            <div>
               
            </div>

                </div>
                
            
        )
    }

            
    
    
export default Discover