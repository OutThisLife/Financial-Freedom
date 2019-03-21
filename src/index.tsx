import * as React from 'react'
import { createContext, useEffect, useState } from 'react'
import { render } from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'

import EntryForm from './components/EntryForm'
import Results from './components/Results'
import { FFTheme, GlobalStyles } from './styles'

export const FormCTX = createContext<{
  form?: IObject
  setValue?: React.Dispatch<React.SetStateAction<{}>>
}>({})

const Wrapper = styled('section')`
  display: grid;
  position: relative;
  max-width: 1400px;
  margin: auto;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(40, 1fr);
    height: 100vh;
    overflow: hidden;
    padding: var(--pad) 0;
  }

  @media (max-width: 1024px) {
    grid-row-gap: calc(var(--pad) * 4);
    padding: calc(var(--pad) * 2);
  }

  > form {
    grid-column: 3 / 12;

    @media (min-width: 1024px) {
      display: flex;
      flex-wrap: wrap;

      fieldset {
        align-self: flex-end;

        + div {
          align-self: flex-start;
        }
      }
    }

    @media (max-width: 1024px) {
      grid-column: 1 / -1;
    }
  }

  > section {
    grid-column: 15 / -3;

    @media (min-width: 1024px) {
      max-height: calc(100vh - (var(--pad) * 2));
      overflow: auto;
      align-self: center;
    }

    @media (max-width: 1024px) {
      grid-column: 1 / -1;
    }
  }
`

const initialState = {
  months: 24,
  income: 5000,
  expenses: 3000,
  get net() {
    return this.income - this.expenses
  },

  cash: 1000,
  savings: 500,
  assets: 0,

  to_assets: 0.3,
  to_savings: 0.1,
  get to_cash() {
    return Math.max(0, 1 - (this.to_savings + this.to_assets))
  }
}

const App = () => {
  const [isLoading, setLoading] = useState(true)
  const [form, setValue] = useState<IObject>(initialState)

  useEffect(() => {
    if (!isLoading) {
      return
    }

    if (localStorage.getItem('entry')) {
      const cache = JSON.parse(localStorage.getItem('entry'))

      setValue(
        Object.defineProperties(
          form,
          Object.keys(cache)
            .filter(k => !/net|to_cash/.test(k))
            .reduce((acc, k) => (
              (acc[k] = {
                value: cache[k],
                writable: true,
                enumerable: true
              }), acc
            ), {})
        )
      )
    }

    setLoading(false)
  }, [isLoading])

  useEffect(() => {
    localStorage.setItem('entry', JSON.stringify(form))
  }, [form])

  return (
    <ThemeProvider theme={FFTheme}>
      <FormCTX.Provider value={{ form, setValue }}>
        <GlobalStyles />

        <Wrapper>
          <EntryForm />
          <Results />
        </Wrapper>
      </FormCTX.Provider>
    </ThemeProvider>
  )
}

render(<App />, document.getElementById('app'))
