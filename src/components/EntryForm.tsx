import { transparentize } from 'polished'
import * as React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { palette, withProp } from 'styled-tools'

import { FormCTX } from '..'
import Field from './Field'
import { fmt } from './Results'

const Wrapper = styled('form')`
  fieldset {
    margin: 0;
    padding: var(--pad);
    border: 1px solid ${withProp(palette('text'), transparentize(0.9))};
    border-top-width: 2px;
  }

  hr {
    border: 0;
    margin: var(--pad) 0;
  }

  [type='submit'] {
    display: none;
  }
`

const Stats = styled('div')`
  display: grid;
  grid-template-columns: max-content minmax(max-content, 50px);
  grid-column-gap: calc(var(--pad) / 2);
  white-space: nowrap;
  padding: var(--pad);
  padding-left: 0;
`

export default () => {
  const {
    form: { net, to_assets, to_savings, to_cash }
  } = useContext(FormCTX)

  return (
    <Wrapper method="post" action="javascript:;">
      <fieldset>
        <Field
          title="Months"
          placeholder="How many months do you want to see?"
          step={4}
        />

        <hr />

        <Field title="Income/mo" placeholder="What do you make per month?" />

        <Field
          title="Expenses/mo"
          placeholder="How much do you pay for bills?"
        />

        <Field title="Net" readOnly />

        <hr />

        <Field title="Cash" placeholder="What's your checkings at?" />
        <Field title="Savings" placeholder="What's your savings at?" />
        <Field title="Assets" placeholder="What do you have invested?" />

        <hr />

        <Field title="% to assets" placeholder="0.2" step={0.1} />
        <Field title="% to savings" placeholder="0.1" step={0.1} />
        <Field title="% to cash" readOnly />

        <button type="submit" />
      </fieldset>

      <Stats>
        <span>net:</span> <span>{fmt(net)}</span>
        <span>assets:</span> <span>{fmt(net * to_assets)}</span>
        <span>saved:</span> <span>{fmt(net * to_savings)}</span>
        <span>cash:</span> <span>{fmt(net * to_cash)}</span>
      </Stats>
    </Wrapper>
  )
}
