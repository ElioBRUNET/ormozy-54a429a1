const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Receive notification",
      description: "Every 15 minutes, Ormozy gently reminds you to check in"
    },
    {
      number: "02",
      title: "Log in seconds",
      description: "Quickly note what you've been working on—no complexity"
    },
    {
      number: "03",
      title: "View your day",
      description: "See a clear summary of how you spent your time and where your focus went"
    }
  ];

  return (
    <section className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-20">How it works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-foreground text-background rounded-xl flex items-center justify-center mx-auto mb-6 font-semibold text-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
