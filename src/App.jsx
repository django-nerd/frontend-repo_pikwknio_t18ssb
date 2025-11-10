import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-black">
          <Hero />
        </div>
      </main>
    </div>
  )
}

export default App