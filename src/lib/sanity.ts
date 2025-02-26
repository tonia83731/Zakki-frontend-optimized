import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_APP_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_APP_SANITY_DATASET;
const apiVersion = import.meta.env.VITE_APP_SANITY_API_VERSION;

// console.log(projectId, dataset, apiVersion);
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
// console.log(client.fetch);

export const clientCDNFalse = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
