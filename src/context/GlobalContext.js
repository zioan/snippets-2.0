import React, { createContext, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider(props) {
  const [appTheme, setAppTheme] = useState('dark')

  return (
    <GlobalContext.Provider value={{ appTheme, setAppTheme }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
export { GlobalProvider }
