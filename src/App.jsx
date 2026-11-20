import { useState } from 'react'
import { Links, Route, Routes} from 'react-router'
import './App.css'
import HomePage from './pages/HomePage'
import Layout from './Layouts/Layout'
import Login from './pages/Login'
import Planner from './pages/Planner'
import RecipeDetails from './pages/RecipeDetail'
import Register from './pages/Register'
import ShoppingList from './pages/ShoppingList'
import NotFound from './pages/NotFound'
import Favourite from './pages/Favourite'
import Discover from './pages/Discover'

function App() {
  return(
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="Favourite" element={<Favourite />} />
          <Route path="Planner" element={<Planner />} />
          <Route path="Shopping-List" element={<ShoppingList />} />
          <Route path="Discover" element={<Discover />} />
          <Route path="/recipe/:recipeId"element={<RecipeDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
  
}
export default App