// src/sanityClient.js
import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'vsktnbh6', // Replace with your project ID
  dataset: 'production', // Replace with your dataset
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-01-01', // Use a date string to ensure correct API version
});

export default client;