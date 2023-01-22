import Link from "next/link";
import { IPost } from "..";

type PostProps = { post: IPost };

export default function Post({ post }: PostProps) {
  return (
    <>
      <main>
        <Link href="/">Revenir à l&apos;accueil</Link>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </main>
    </>
  );
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const post = (await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((r) => r.json())) as IPost;

  return { props: { post } };
}

export async function getStaticPaths() {
  const posts = (await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=4"
  ).then((r) => r.json())) as IPost[];

  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
}
