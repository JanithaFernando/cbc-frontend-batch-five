import './App.css'
import Header from './components/header'
import ProductCard from "./components/productCard"


function App() {

  return (
    <>
      <Header/>
      <ProductCard name="Apple Laptop" description="lorem sdaf sad sad" price="1000" picture="https://picsum.photos/id/2/500/350"/>
      <ProductCard name="Dell Laptop" description="lorem sdaf sad sad qwa 2" price="800" picture="https://picsum.photos/id/1/500/350"/>
    </>
  )
}

export default App
