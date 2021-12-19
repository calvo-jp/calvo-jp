import config from "config";

interface Email {
  sender: string;
  subject?: string;
  body: string;
}

export const send = async (data: Email) => {
  const request = new Request(config.APIPrefix + "/emails", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const response = await fetch(request);
  return await response.json();
};
