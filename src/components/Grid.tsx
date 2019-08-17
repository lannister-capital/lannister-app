import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
`

export const HorizontalFlex = styled(Flex)`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const RightAlignContainer = styled.div`
  text-align: right;
`
