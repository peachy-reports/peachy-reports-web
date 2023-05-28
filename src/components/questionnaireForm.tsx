'use client';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
  Text, Button, ButtonGroup
  } from '@chakra-ui/react'

import { useState } from 'react'
export default function QuestionnaireForm() {
	return (
	  <>
		<Example question={"What is the name of your company?"}></Example>
		<Example question={"What does your company make?"}></Example>
		<Example question={"What sector are you in? What are the sustainability risks and opportunities for the industry?"}></Example>
		<Example question={"What are your main sustainability goals for the next year? Can you provide 3 metrics to quantify this?"}></Example>
		<Example question={"Are you undertaking any ESG initiatives, certifications, grants, etc. in support of these goals? If not, and you'd like us to help you brainstorm, click this button."}></Example>
		<Button colorScheme='blue'>Button</Button>
		<Example question={"Now let's figure out your rough emissions. If you use vehicles as part of your operation, how much fuel did you use last year? If you didn't use vehicles, please put 0."}></Example>
		<Example question={"How much electricity did you use across all company locations (in kwh)?"}></Example>
		<Example question={"Where are you employees located? Describe your employee count by state."}></Example>
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
        placeholder={'  '}
        size='md'
      />
    </>
  )
}