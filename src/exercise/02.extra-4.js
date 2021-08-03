// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(initialValue = {}) {
    const [value, setValue] = React.useState(() => {
        const stateString = window.localStorage.getItem('state')
        return (stateString && JSON.parse(stateString)) || initialValue
    })

    React.useEffect(() => {
        const stateString = JSON.stringify(value);
        window.localStorage.setItem('state', stateString);
    }, [value])

    return [value, setValue]
}

function Greeting({initialState = {}}) {
  const [state, setState] = useLocalStorageState(initialState)

  function handleChange(event) {
    setState({
        name: event.target.value
    })
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={state.name || ''} onChange={handleChange} id="name" />
      </form>
      {state.name ? <strong>Hello {state.name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
