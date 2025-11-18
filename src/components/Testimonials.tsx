const Testimonials = () => {
  const testimonials = [
    {
      quote: "I finally understand where my day goes. The 15-minute check-ins are so simple, I actually stick with them.",
      author: "Sarah Chen",
      role: "Product Designer"
    },
    {
      quote: "Ormozy helped me realize I was spending way too much time in meetings. Now I protect my focus blocks.",
      author: "Michael Torres",
      role: "Software Engineer"
    },
    {
      quote: "It's the only tracking tool that doesn't feel like work. Just quick notes, and suddenly my week makes sense.",
      author: "Emma Wilson",
      role: "Freelance Writer"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">What people say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-muted rounded-2xl p-8">
              <p className="text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
