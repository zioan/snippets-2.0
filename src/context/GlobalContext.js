import React, { createContext, useEffect, useState } from 'react'

const GlobalContext = createContext()

function GlobalProvider(props) {
  const [appTheme, setAppTheme] = useState(null)

  return (
    <GlobalContext.Provider value={{ appTheme, setAppTheme }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalContext
export { GlobalProvider }
