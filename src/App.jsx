import { useState } from 'react'
import { Links, Route } from 'react-router'
import './App.css'
import Layout from './Layouts/Layout'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Planner from './pages/Planner'
import RecipeDetails from './pages/RecipeDetail'
import Register from './pages/Register'
import ShoppingList from './pages/ShoppingList'
import NotFound from './pages/NotFound'
import Favourite from './pages/Favourite'

function App() {
  return(
    <div>
    <Route>
      <Route path='/' element = {HomePage } />
      <Route path='Login' element = {Login } />
      <Route path='Register' element = {Register } />
      <Route path='Favourite' element = {Favourite } />
      <Route path='Planner' element = {Planner } />
      <Route path='Shopping-List' element = {ShoppingList } />
      <Route path='recipe/:id' element = {RecipeDetails } />
      <Route path='*' element = {NotFound } />
      

    </Route>
    </div>

  )
  
}
export default App