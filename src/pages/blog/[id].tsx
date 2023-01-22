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

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const post = (await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((r) => r.json())) as IPost;

  return { props: { post } };
}
