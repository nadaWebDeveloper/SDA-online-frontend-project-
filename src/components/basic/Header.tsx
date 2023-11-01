import Hero from "./Hero"
import NavBar from "./NavBar"

function Header() {
  return (
<>
<NavBar />
<header className="headerSection">
<h1>My Website Header</h1>
<Hero />
</header>
</>  )
}

export default Header