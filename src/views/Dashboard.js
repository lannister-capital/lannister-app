import React from 'react'
import styled from 'styled-components'
import HoldingsList from '../components/Holdings/HoldingsList'
import { PieChart, Pie } from 'recharts'

const Container = styled.div`
  padding: 58px;
  text-align: left;
  width: 100%;
`

const Flex = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1;
  flex-direction: column;
`

const data = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 }
]

const Dashboard = () => {
  return (
    <Container>
      <h1>Total Portfolio Value</h1>

      <Flex>
        <Column>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              dataKey="value"
              cx={200}
              cy={200}
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </Column>
        <Column>
          <HoldingsList />
        </Column>
      </Flex>
    </Container>
  )
}

export default Dashboard
