import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type HomeProps = { posts: IPost[]; date: string };

export default function Home({ posts, date }: HomeProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => setCount((n) => n + 1), 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Mon super blog</title>
      </Head>
      <h1>
        Count: {count} - {date}
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>
              <h3>{`${post.id} - ${post.title}`}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const posts = (await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=4"
  ).then((r) => r.json())) as IPost[];

  return { props: { posts, date: new Date().toString() }, revalidate: 5 };
}
