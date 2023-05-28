'use client';

import { Image, Text, Button, Link } from '@chakra-ui/react'
export default function Home() {
  return (
    <div>
    	<Image
		  borderRadius='full'
		  boxSize='150px'
		  src='https://i.im.ge/2023/05/28/hiqTgh.noun-peach-1554586.png'
		  alt='Peachy'
		/>
    	<Text fontSize={36}>Peachy</Text>
        <h1></h1>
        <h2></h2>
        <Text fontSize={24}>We make sustainability reporting quick, easy, and accessible. </Text>
        <h3> </h3>
        <h4>We'll generate your sustainability report in 15 minutes.  </h4>
        <h4>No prior sustainability expertise required.  </h4>
        <h4>Fill in this  form and we will do the rest.  </h4>
        <h5> </h5>
        <Button colorScheme='teal' size='lg'>
		  <Link color='white' href='http://localhost:3000/start'>
		    Get started.
		  </Link> </Button>
		  <h5> </h5>
		  <h5> </h5>
    </div>
  )
}
