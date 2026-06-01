import { useState } from "react";
import { Heart } from "lucide-react";

export default function SubmitTestimonialForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    author: "",
    context: "",
    quote: "",
    rating: 5,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-white">
          Your Name *
        </label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={formData.author}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="context" className="block text-sm font-medium text-white">
          Your Connection/Project Info *
        </label>
        <input
          type="text"
          id="context"
          name="context"
          required
          value={formData.context}
          onChange={handleChange}
          className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30"
          placeholder="e.g., 'Console table commissioned in 2026'"
        />
      </div>

      <div>
        <label htmlFor="quote" className="block text-sm font-medium text-white">
          Your Testimonial *
        </label>
        <textarea
          id="quote"
          name="quote"
          required
          value={formData.quote}
          onChange={handleChange}
          rows={6}
          className="mt-2 w-full rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30"
          placeholder="Share your experience with Grain Forge Studio..."
        />
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-white">
          Rating
        </label>
        <div className="mt-2 flex items-center gap-3">
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="rounded-lg border border-white/20 bg-black/30 px-4 py-3 text-white transition focus:border-amber-300/50 focus:outline-none focus:ring-1 focus:ring-amber-300/30"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "heart" : "hearts"}
              </option>
            ))}
          </select>
          <div className="flex gap-1">
            {Array.from({ length: formData.rating }).map((_, i) => (
              <Heart
                key={i}
                className="h-4 w-4 fill-red-500 text-red-500"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-gradient-to-r from-amber-300 to-orange-400 px-6 py-3 font-semibold text-zinc-950 transition hover:from-amber-200 hover:to-orange-300"
      >
        Submit Testimonial
      </button>
    </form>
  );
}
