import React from 'react'
import '@/assets/css/app'
import Header from '@/components/Header'
import Home from '@/components/Home'

class App extends React.Component {
  constructor(porps) {
    super(porps)
  }

  render() {
    return (
      <div className="ick-app">
        <Header />
        <Home />
      </div>
    )
  }
}

export default App
