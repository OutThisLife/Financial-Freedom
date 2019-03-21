import Cleave from 'cleave.js/react'
import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'

import { FormCTX } from '..'

const Wrapper = styled('label')`
  cursor: default;
  display: grid;
  grid-template-columns: 85px 1fr;
  grid-gap: var(--pad);
  align-items: center;

  &[readonly] {
    pointer-events: none;
  }

  &:not(:first-of-type) {
    margin-top: calc(var(--pad) / 4);
  }

  div {
    font-weight: 700;
    text-transform: uppercase;

    @media (min-width: 1024px) {
      text-align: right;
    }
  }

  &[readonly] div {
    opacity: 0.25;
  }

  input {
    width: 100%;
  }
`

export default ({ title, step = 100, ...props }) => {
  const { form, setValue } = useContext(FormCTX)
  const key = slugify(title)
  const value = form[key]

  const onChange = ({ target: { rawValue } }) =>
    rawValue.length &&
    setValue({
      ...Object.defineProperty(form, key, {
        value: parseFloat(rawValue),
        writable: true,
        enumerable: true
      })
    })

  return (
    <Wrapper {...props}>
      <div>{title}</div>

      <Cleave
        type="text"
        options={{
          numeral: true,
          numeralDecimalScale: 2
        }}
        {...{ value, onChange }}
        {...props}
      />
    </Wrapper>
  )
}

const slugify = (s = '') =>
  s
    .toLowerCase()
    .split('/')
    .filter(s => s)[0]
    .replace(/\s+/g, '_')
    .replace(/[^\w\-]+/g, '')
    .replace(/^_/, '')
