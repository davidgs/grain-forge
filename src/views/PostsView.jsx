import { ArrowRight, Mail } from "lucide-react";
import Footer from "../components/Footer.jsx";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function getTypeLabel(type) {
  return type === "blog" ? "Blog" : "WIP";
}

export default function PostsView({
  posts,
  onBackHome,
  onOpenCommissionModal,
  onOpenPost,
  onContactClick,
  onSocialClick,
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[22%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[32%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
            Back to home
          </button>
          <button
            type="button"
            onClick={onOpenCommissionModal}
            className="inline-flex items-center rounded-full bg-white/[0.5] px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
          >
            <Mail className="mr-2 h-4 w-4" />
            Start a commission
          </button>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10 lg:p-12">
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-400">
            Grain Forge Studio
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Shop updates and journal posts.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
            A combined feed for finished thoughts, build notes, and in-progress
            updates from the shop.
          </p>

          {posts.length ? (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-black/35"
                >
                  {post.coverImage ? (
                    <button
                      type="button"
                      onClick={() => onOpenPost(post.slug)}
                      className="block w-full text-left"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </button>
                  ) : null}
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-zinc-200">
                        {getTypeLabel(post.type)}
                      </span>
                      <span>{dateFormatter.format(new Date(post.date))}</span>
                      {post.draft ? (
                        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2.5 py-1 text-amber-100">
                          Draft preview
                        </span>
                      ) : null}
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">
                      {post.summary}
                    </p>

                    {post.tags.length ? (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => onOpenPost(post.slug)}
                      className="mt-6 inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-50 transition hover:bg-amber-300/15"
                    >
                      Read entry
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-3xl border border-dashed border-white/20 bg-black/35 p-6 text-sm text-zinc-300">
              No posts published yet. Add a markdown file in `src/content/posts/`
              to populate this section.
            </div>
          )}

          <div className="mt-8 border-t border-white/10 pt-5">
            <Footer
              onContactClick={onContactClick}
              onOpenPostsPage={null}
              onSocialClick={onSocialClick}
            />
          </div>
        </section>
      </main>
    </div>
  );
}