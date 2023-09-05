import React from 'react'
import ProductCard from '../components/Card/ProductCard'
import CategoryCard from '../components/Card/CategoryCard'
import { Box} from '@chakra-ui/react'
import LineBreak from '../components/Custom/LineBreak'

const HomePage = () => {
  return (
    <Box>
      <LineBreak data="Category" mt={10} mb={10} />
      <CategoryCard />
      <LineBreak data="Product" mt={20} mb={10} />
      <ProductCard />
    </Box>
  )
}

export default HomePage