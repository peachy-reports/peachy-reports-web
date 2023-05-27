'use client';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
  } from '@chakra-ui/react'

export default function QuestionnaireForm() {
	return (
	  <>
		<FormControl>
		  <FormLabel>Email address</FormLabel>
		  <Input type='email' />
		  <FormHelperText>We'll never share your email.</FormHelperText>
		</FormControl>
	  </>)
	;
}