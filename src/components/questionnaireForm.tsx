'use client';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
  Text
  } from '@chakra-ui/react'

import { useState } from 'react'
export default function QuestionnaireForm() {
	return (
	  <>
		<FormControl>
		  <FormLabel>Email address</FormLabel>
		  <Input type='email' />
		  <FormHelperText>We'll never share your email.</FormHelperText>
		</FormControl>
		<Example question={"What is the name of your company?"}></Example>
	  </>)
	;
}

interface questionProps {
  question: string;
}

function Example({ question }: questionProps) {
  const [value, setValue] = useState('')
  const handleChange = (event: any) => setValue(event.target.value)

  return (
    <>
      <Text>{question}</Text>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={question}
        size='md'
      />
    </>
  )
}