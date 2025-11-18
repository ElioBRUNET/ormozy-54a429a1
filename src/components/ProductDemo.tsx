const ProductDemo = () => {
  const demos = [
    { label: "Quick log interface" },
    { label: "Daily summary" },
    { label: "Notification example" }
  ];

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold text-center mb-16">See Ormozy in action</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <div key={demo.label} className="bg-background rounded-2xl p-8 aspect-square flex items-center justify-center">
              <p className="text-muted-foreground text-center">{demo.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
