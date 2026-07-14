import type { Metadata } from "next";
import Link from "next/link";
import {
  fetchAllPostIds,
  fetchPostAttachments,
  fetchPostById,
} from "@/lib/posts";
import NoticeActions from "./_components/NoticeActions";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await fetchAllPostIds();
  return posts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchPostById(id);
  if (!post) return { title: "글을 찾을 수 없어요" };

  const description =
    typeof post.content === "string"
      ? post.content.replace(/\s+/g, " ").slice(0, 140)
      : undefined;

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `/notice/${id}`,
      images: post.image_url
        ? [{ url: post.image_url, alt: post.title }]
        : undefined,
    },
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await fetchPostById(id);

  if (!post) return <div className="p-8">글을 찾을 수 없어요.</div>;

  const files = await fetchPostAttachments(id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-3 text-sm opacity-60">{post.category}</div>
      <h1 className="text-3xl font-semibold">{post.title}</h1>
      <div className="mt-2 text-sm opacity-60">
        {new Date(post.published_at).toLocaleDateString("ko-KR")}
      </div>
      <NoticeActions postId={id} />

      {post.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image_url}
          alt=""
          className="card-border-shadow mt-6 w-full rounded-2xl object-cover"
        />
      )}

      <div className="mt-6 whitespace-pre-wrap text-base leading-relaxed">
        {post.content}
      </div>

      {files.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-3 text-lg font-semibold">첨부파일</h2>
          <ul className="space-y-2">
            {files.map((f) => (
              <li key={f.id}>
                <a className="underline" href={f.file_url} target="_blank" rel="noreferrer">
                  {f.file_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-12 border-t pt-8">
        <Link
          href="/notice"
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
        >
          ← 목록보기
        </Link>
      </div>
    </main>
  );
}
