const getServerBaseUrl = () => {
  const slash = "/";
  const colon = ":";

  return [
    process.env.SERVER_PROTOCOL,
    colon,
    slash,
    slash,
    process.env.SERVER_HOST,
    colon,
    process.env.SERVER_PORT,
    slash,
    process.env.SERVER_EXTRA,
  ]
    .join("")
    .replace(/\/$/, "");
};

export default getServerBaseUrl;
