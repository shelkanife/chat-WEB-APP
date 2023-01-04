export async function requestTo(path, method, body) {
  console.log(`http://localhost:3000/chat/rooms/${path}`);
  console.log(JSON.stringify(body));
  return await fetch(`http://localhost:3000/chat/rooms/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
}
