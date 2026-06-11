import { useEffect, useState } from "react";
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

export default function PostDetailView({
  post,
  posts,
  onBackHome,
  onBackToPosts,
  onOpenCommissionModal,
  onOpenPost,
  onContactClick,
  onSocialClick,
}) {
  const [lightboxMedia, setLightboxMedia] = useState(null);

  const relatedPosts = post
    ? posts.filter((entry) => entry.slug !== post.slug).slice(0, 3)
    : posts.slice(0, 3);

  useEffect(() => {
    if (!lightboxMedia) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxMedia(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxMedia]);

  const handleArticleClick = (event) => {
    const imageElement = event.target.closest("img");

    if (!imageElement || !event.currentTarget.contains(imageElement)) {
      return;
    }

    const source = imageElement.getAttribute("src");

    if (!source) {
      return;
    }

    const linkedAnchor = imageElement.closest("a");
    if (linkedAnchor) {
      event.preventDefault();
    }

    setLightboxMedia({
      type: "image",
      src: source,
      alt: imageElement.getAttribute("alt") || post?.title || "Post image",
    });
  };

  const handleArticleDoubleClick = (event) => {
    const videoElement = event.target.closest("video.post-video");

    if (!videoElement || !event.currentTarget.contains(videoElement)) {
      return;
    }

    const source =
      videoElement.currentSrc ||
      videoElement.getAttribute("src") ||
      videoElement.querySelector("source")?.getAttribute("src");

    if (!source) {
      return;
    }

    const linkedAnchor = videoElement.closest("a");
    if (linkedAnchor) {
      event.preventDefault();
    }

    setLightboxMedia({
      type: "video",
      src: source,
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950 text-zinc-100 selection:bg-amber-300 selection:text-zinc-950">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-amber-700/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[22%] h-[30rem] w-[30rem] rounded-full bg-orange-800/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[32%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="relative mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
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
              onClick={onBackToPosts}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              All updates
            </button>
          </div>

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
          {post ? (
            <>
              <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-zinc-200">
                  {getTypeLabel(post.type)}
                </span>
                <span>{dateFormatter.format(new Date(post.date))}</span>
                {post.updatedAt ? (
                  <span>
                    Updated {dateFormatter.format(new Date(post.updatedAt))}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-300 sm:text-base sm:leading-7">
                {post.summary}
              </p>

              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="mt-8 aspect-[16/9] w-full rounded-[1.75rem] border border-white/10 object-cover"
                />
              ) : null}

              <article
                className="markdown-content mt-8"
                onClick={handleArticleClick}
                onDoubleClick={handleArticleDoubleClick}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/20 bg-black/35 p-6 text-sm text-zinc-300">
              <h1 className="text-2xl font-semibold text-white">
                Post not found.
              </h1>
              <p className="mt-3 max-w-2xl leading-7">
                This entry does not exist, or it may be marked as a draft and
                hidden from the production build.
              </p>
              <button
                type="button"
                onClick={onBackToPosts}
                className="mt-5 inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-50 transition hover:bg-amber-300/15"
              >
                Back to all updates
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}

          {relatedPosts.length ? (
            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">
                  More from the journal
                </h2>
                <button
                  type="button"
                  onClick={onBackToPosts}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Browse all
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {relatedPosts.map((entry) => (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => onOpenPost(entry.slug)}
                    className="rounded-3xl border border-white/10 bg-black/35 p-5 text-left transition hover:border-white/20 hover:bg-black/45"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-400 sm:text-xs">
                      {getTypeLabel(entry.type)} · {dateFormatter.format(new Date(entry.date))}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-white">
                      {entry.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      {entry.summary}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 border-t border-white/10 pt-5">
            <Footer
              onContactClick={onContactClick}
              onOpenPostsPage={onBackToPosts}
              onSocialClick={onSocialClick}
            />
          </div>
        </section>
      </main>

      {lightboxMedia ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setLightboxMedia(null);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Media preview"
        >
          {lightboxMedia.type === "video" ? (
            <video
              src={lightboxMedia.src}
              className="max-h-[96vh] max-w-[96vw] rounded-xl object-contain"
              controls
              autoPlay
              playsInline
            />
          ) : (
            <img
              src={lightboxMedia.src}
              alt={lightboxMedia.alt}
              className="max-h-[96vh] max-w-[96vw] rounded-xl object-contain"
            />
          )}

          <button
            type="button"
            onClick={() => setLightboxMedia(null)}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white transition hover:bg-black/75"
            aria-label="Close media preview"
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}