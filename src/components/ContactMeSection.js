import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      email: "foo@bar.com",
      type: "",
      comment: "",
    },
    onSubmit: (values, { resetForm }) => {
      submit(values, (result) => {
        if (result.type === 'success') {
          // Ensure the type is first and then the message
          onOpen({ type: 'success', message: `Submission successful, ${values.firstName}!`});
          resetForm();
        } else {
          // Ensure the type is first and then the message
          onOpen({ type: 'error', message: 'Submission failed, please try again!'});
        }
      });
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      type: Yup.string().required('Type of enquiry is required'),
      comment: Yup.string().required('Message is required'),
    }),
  });

  useEffect(() => {
    if (response) {
      onOpen(response.message, response.type);
    }
  }, [response, onOpen]);

  return (
      <FullScreenSection
          isDarkBackground
          backgroundColor="#512DA8"
          py={16}
          spacing={8}
      >
        <VStack w="1024px" p={32} alignItems="flex-start">
          <Heading as="h1" id="contactme-section">
            Contact me
          </Heading>
          <Box p={6} rounded="md" w="100%">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={formik.touched.firstName && !!formik.errors.firstName}>
                  <FormLabel htmlFor="firstName">Name</FormLabel>
                  <Input
                      id="firstName"
                      {...formik.getFieldProps('firstName')}
                  />
                  <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <Input
                      id="email"
                      type="email"
                      {...formik.getFieldProps('email')}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.type && !!formik.errors.type}>
                  <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                  <Select id="type" {...formik.getFieldProps('type')}>
                    <option value="">Select type</option>
                    <option value="hireMe">Freelance project proposal</option>
                    <option value="openSource">Open source consultancy session</option>
                    <option value="other">Other</option>
                  </Select>
                  <FormErrorMessage>{formik.errors.type}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={formik.touched.comment && !!formik.errors.comment}>
                  <FormLabel htmlFor="comment">Your message</FormLabel>
                  <Textarea
                      id="comment"
                      {...formik.getFieldProps('comment')}
                      height={250}
                  />
                  <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" width="full" isLoading={isLoading}>
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </FullScreenSection>
  );
};

export default LandingSection;
