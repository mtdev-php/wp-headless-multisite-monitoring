export async function apiGet(api_url, user, password) 
{
  const options = {};

  // Only add auth header if credentials provided
  if(user && password){
    options.headers = {
      Authorization: 'Basic ' + btoa(`${user}:${password}`),
    };
  }

  const res = await fetch(api_url, options);

  if(!res.ok){
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}