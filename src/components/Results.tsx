import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { palette } from 'styled-tools'

import { FormCTX } from '..'

const Wrapper = styled('table')`
  position: relative;
  table-layout: fixed;
  border-collapse: collapse;
  width: 100%;

  tr > * {
    cursor: default;
    text-align: center;

    &:first-of-type {
      text-align: left;
    }

    &:last-of-type {
      text-align: right;
    }
  }

  thead th {
    position: sticky;
    top: 0;
    font-weight: 700;
    text-transform: uppercase;
    background: ${palette('bg')};
  }

  tbody tr:hover {
    color: ${palette('bg')};
    font-weight: 700;
    outline: 0.2em solid ${palette('primary')};
    background: ${palette('primary')};
  }
`

export default () => {
  const {
    form: { months, net, to_assets, to_savings, to_cash }
  } = useContext(FormCTX)

  return (
    <Wrapper>
      <thead>
        <tr>
          <th style={{ width: 20 }}>&nbsp;</th>
          <th>Assets ({perc(to_assets)})</th>
          <th>Saved ({perc(to_savings)})</th>
          <th>Cash ({perc(to_cash)})</th>
        </tr>
      </thead>

      <tbody key={net}>
        {[...Array(range(months)).keys()]
          .map(i => (i + 1) * net)
          .map((r, i) => (
            <tr key={i}>
              <td>{i}</td>
              <td>{fmt(r * to_assets)}</td>
              <td>{fmt(r * to_savings)}</td>
              <td>{fmt(r * to_cash)}</td>
            </tr>
          ))}
      </tbody>
    </Wrapper>
  )
}

export const range = (n = 1) => Math.max(1, n)
export const perc = (n = 0) => (n * 100).toFixed(0) + '%'
export const fmt = (n = 0) =>
  `${n < 0 ? '(' : ''}${Math.abs(n).toLocaleString('en-US')}${n < 0 ? ')' : ''}`
