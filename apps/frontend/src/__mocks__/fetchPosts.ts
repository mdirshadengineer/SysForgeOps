export const fetchPosts = async (): Promise<
  Array<{
    userId: string;
    id: number;
    title: string;
    completed: boolean;
  }>
> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};
