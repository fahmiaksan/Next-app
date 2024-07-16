export const getData = async (url: string) => {
  const res = await fetch(url, {
    cache: 'no-store',
    next: {
      tags: ['products'],
    }
  });
  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  return res.json();
}