const Benefits = () => {
  const benefits = [
    {
      number: "01",
      title: "Improved clarity",
      description: "See exactly where your time goes without guessing or estimating"
    },
    {
      number: "02",
      title: "Better focus",
      description: "Regular check-ins naturally encourage mindful work and reduce distractions"
    },
    {
      number: "03",
      title: "Built-in accountability",
      description: "Knowing you'll log your time helps you stay on track throughout the day"
    },
    {
      number: "04",
      title: "Consistent tracking",
      description: "The 15-minute rhythm becomes second nature—no manual timers needed"
    }
  ];

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-16">The benefits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.number} className="flex gap-4">
              <div className="w-12 h-12 bg-foreground text-background rounded-lg flex items-center justify-center font-semibold flex-shrink-0">
                {benefit.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
