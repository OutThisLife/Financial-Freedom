import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { palette } from 'styled-tools'

import { FormCTX } from '..'

const Wrapper = styled('section')`
  position: relative;

  @media (min-width: 1024px) {
    padding: 0 calc(var(--pad) / 2);
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

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
    form: { months, net, assets, savings, cash, to_assets, to_savings, to_cash }
  } = useContext(FormCTX)

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th style={{ width: 20 }}>&nbsp;</th>
            <th>Cash ({perc(to_cash)})</th>
            <th>Saved ({perc(to_savings)})</th>
            <th>Assets ({perc(to_assets)})</th>
          </tr>
        </thead>

        <tbody key={net}>
          {[...Array(range(months + 1)).keys()]
            .map(i => i * net)
            .map((r, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{fmt(cash + r * to_cash)}</td>
                <td>{fmt(savings + r * to_savings)}</td>
                <td>{fmt(assets + r * to_assets)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Wrapper>
  )
}

export const range = (n = 1) => Math.max(1, n)
export const perc = (n = 0) => (n * 100).toFixed(0) + '%'
export const fmt = (n = 0) =>
  `${n < 0 ? '(' : ''}${Math.abs(n).toLocaleString('en-US')}${n < 0 ? ')' : ''}`
