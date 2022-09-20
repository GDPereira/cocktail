const baseURL = 'https://the-cocktail-db.p.rapidapi.com/';
const defaultHeaders = {
  'X-RapidAPI-Key': '978be92442msh48bc366f0ba2f4bp1c5960jsnc10a33ba13b8',
  'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
};

const api = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  options.headers = {...options.headers, ...defaultHeaders};

  const response = await fetch(`${baseURL}${endpoint}`, options);
  const responseJson = await response.json();
  return responseJson as Promise<T>;
};

export default api;
