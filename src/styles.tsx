import { transparentize } from 'polished'
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { palette, theme, withProp } from 'styled-tools'

export const FFTheme = {
  family: 'monospace',
  palette: {
    bg: '#fff',
    text: '#111',
    primary: '#0000ee',
    secondary: '#f36'
  }
}

declare global {
  type FFTheme = typeof FFTheme
}

export const GlobalStyles = createGlobalStyle`
  :root {
    --pad: calc(8px + (25 - 8) * (100vw - 400px) / 1600);
  }

  * {
    box-sizing: border-box;
  }

  body {
    color: ${palette('text')};
    font-family: ${theme('family')};
    font-size: 12px;
    line-height: 1.22;
  }

  ::selection {
    color: ${palette('bg')};
    background: ${palette('secondary')}
  }

  ::-webkit-scrollbar {
    width: 3px;
    background: ${palette('bg')};
  }

  ::-webkit-scrollbar-thumb {
    background: ${palette('text')}
  }

  *:focus {
    outline: none;
  }

  a {
    color: ${palette('primary')};
  }

  input {
    --border: ${withProp(palette('text'), transparentize(0.75))};

    display: block;
    padding: 0.4rem;
    border: none;
    box-shadow: .5px .5px 2px ${withProp(
      palette('text'),
      transparentize(0.85)
    )}, inset 0 0 0 1px var(--border);

    &:not([readonly]):focus {
      --border: ${palette('primary')}
    }

    &[readonly] {
      color: ${palette('secondary')};
      box-shadow: none;
    }
  }
`
