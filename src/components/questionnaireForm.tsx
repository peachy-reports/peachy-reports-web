'use client';
import { Input,Text, Button, FormControl, Container, Box } from '@chakra-ui/react'

import { useState } from 'react'

export default function QuestionnaireForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (event: any) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    const data :{ [key: string]: string; } = {};
 
    // Get data from the form.
    for (let i = 1; i < 16; i++) {
      let j = i.toString();
      data[j] = event.target[i-1].value;
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data);

    // API endpoint where we send form data.
    const endpoint = '/api/submit';

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    window.open("/report/1", "_blank");

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
  };
	return (
    <Container>
	  <form onSubmit={handleSubmit}>
    <Example name="1" question={"What is the name of your company?"}></Example>
    <Example name="2" question={"What does your company make?"}></Example>
		<Example name="3" question={"Where is your company headquartered?"}></Example>
		<Example name="4" question={"What are the core values of your company?"}></Example>
    <Example name="5" question={"What sector are you in? What are the sustainability risks and opportunities for the industry?"}></Example>
		<Example name="6" question={"What are your main sustainability goals for the next year? Can you provide 3 metrics to quantify this?"}></Example>
		<FormControl>
      <Example name="7" question={"Are you undertaking any ESG initiatives, certifications, grants, etc. in support of these goals? If not, and you'd like us to help you brainstorm, click this button."}></Example>
		  <Button colorScheme='blue'>Not sure? Let us generate some for you!</Button>
    </FormControl>
		<Example name="8" question={"Now let's figure out your rough emissions. If you use vehicles as part of your operation, how much fuel did you use last year? If you didn't use vehicles, please put 0."}></Example>
		<Example name="9" question={"If you use fossil fuels to heat or cool your facilities, or to generate power on site, what type of fuel did you burn? How much did you burn?"}></Example>
    <Example name="10" question={"How much electricity did you use across all company locations (in kwh)?"}></Example>
		<Example name="11" question={"Where are you employees located? Describe your employee count by state."}></Example>
    <Example name="12" question={"Are you taking any other other initiatives you would like to include in the report? These can include ESG (social or environmental impact). Please describe in keywords or short bullet points."}></Example>
    <Example name="13" question={"Do you have any certification, grants or awards you would like us to include in the report?"}></Example>
    <Example name="14" question={"Who are your partners, these can include investors, technical or auditors?"}></Example>
    <Example name="15" question={"Do you have any data on your materials consumption, suppliers (locations, energy usage), waste or transportation you would like to share? If so please describe below."}></Example>
    <Button type="submit">Submit</Button>
    </form>
    </Container>
		)
	;
}

interface questionProps {
  name: string;
  question: string;
}

function Example({ name, question }: questionProps) {
  const [value, setValue] = useState('');
  const handleChange = (event: any) => setValue(event.target.value);

  return (
    <Box pt={4} pb={4}>
      <Text>{question}</Text>
      <Input
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={'  '}
        size='md'
      />
    </Box>
  );
}