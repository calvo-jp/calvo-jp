const serverProto = process.env.SERVER_PROTOCOL as string;
const serverHost = process.env.SERVER_HOST as string;
const serverPort = process.env.SERVER_PORT as string;
const serverExtra = process.env.SERVER_EXTRA as string;

const getServerBaseUrl = () => {
  const baseUrl = `${serverProto}://${serverHost}:${serverPort}/${serverExtra}`;
  // prettier-ignore
  return baseUrl.replace(/\/$/, "");
};

export default getServerBaseUrl;
