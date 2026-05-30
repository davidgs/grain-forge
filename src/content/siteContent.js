const portfolioImage = (path) => `/portfolio/${path}`;

export const testimonials = [
  {
    id: "testimonial-1",
    author: "Tara O.",
    context: "Console table built for client in 2026.",
    quote:
      "The table Grain Forge Studio made for me is beyond breathtaking. David took my design and brought it to a whole new level. I get so many compliments and love to see it every day. I’m already working on my next order. Highly recommend!",
    rating: 5,
  },
];

export const portfolioItems = [
  {
    id: "console-table",
    title: "Console Table",
    materials: "Maple\nGreen mica-enhanced epoxy\nSteel base",
    summary:
      "I built this console table for a client who wanted a statement piece for their entryway. The design features a flowing river of green mica-enhanced epoxy running through a slab of maple, supported by a sleek steel base. In order to mask the leg mounting brackets, there is a layer dark epoxy on the bottom. The piece was finished with a durable satin finish to enhance the natural beauty of the wood and the shimmer of the epoxy.",
    dimensions: '20"w x 46"L x 30"H',
    image: portfolioImage("tara-console/Tara-0-3.png"),
    alt: "Console table with maple and green mica-enhanced epoxy, angled view.",
    images: [
      {
        src: portfolioImage("tara-console/Tara-0-3.png"),
        alt: "Console table with maple and green mica-enhanced epoxy, angled view.",
      },
      {
        src: portfolioImage("tara-console/Tara-O-1.png"),
        alt: "Console table from the long side showing epoxy flow.",
      },
      {
        src: portfolioImage("tara-console/Tara-O-2.png"),
        alt: "Console table detail view showing surface and edge finish.",
      },
    ],
    feedback: "testimonial-1",
  },
];
