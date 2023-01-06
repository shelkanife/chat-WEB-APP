export async function requestTo(path, method, body) {
  return await fetch(`https://bem-chat.azurewebsites.net/chat/rooms/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}
