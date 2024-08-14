import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainSection from './components/layouts/mainSection'
import Sidebar from './components/layouts/sidebar'
import ListWrapper from './components/listWrapper/listWrapper'

function App() {
  const [selectedOption, setSelectedOption] = useState("tabular");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex">
      <Sidebar />
      <MainSection
        setSelectedOption={setSelectedOption}
        selectedOption={selectedOption}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
      >
        <ListWrapper
          selectedOption={selectedOption}
          searchQuery={searchQuery}
        />
      </MainSection>

    </div>
    </>
  )
}

export default App
