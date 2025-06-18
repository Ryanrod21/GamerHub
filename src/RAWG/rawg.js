const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export async function fetchPopularGames(page = 1, page_size = 5) {
  const url = `${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${page_size}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

export async function searchGames(
  query,
  ordering = '',
  page = 1,
  parentPlatforms = ''
) {
  let url = `${BASE_URL}/games?key=${API_KEY}&search=${query}&search_precise=true&ordering=${ordering}&page=${page}`;

  if (parentPlatforms) {
    url += `&parent_platforms=${parentPlatforms}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search games');
  return res.json();
}

export async function getGameDetails(id) {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch game details');
  return res.json();
}

export async function getGameTags() {
  const url = `${BASE_URL}/tags`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to get Game Tags');

  const data = await res.json();

  return data;
}

export async function getGameGenres() {
  const url = `${BASE_URL}/genres?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch games');
  const data = await res.json();

  data.results.sort((a, b) => a.name.localeCompare(b.name));

  return data;
}

export async function getGamesByGenres(genreSlug, page = 1) {
  const url = `${BASE_URL}/games?key=${API_KEY}&genres=${genreSlug}&page=${page}&page_size=12`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch games');
  return res.json();
}

export async function getGameScreenShot(id) {
  const url = `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`;
  const res = await fetch(url);
  return res.json();
}
