import { FaqAccordion } from "@/components/ui/faq-chat-accordion";

const WhyOrmozy = () => {
  const faqData = [
    {
      id: 1,
      question: "The story behind Ormozy",
      answer: "Built after realizing days were disappearing without a trace. Every evening felt like a blur. Sound familiar? Most time tracking tools are built for billing or management—heavy, complex, easy to ignore. Ormozy is different. It's built for you.",
      icon: "❤️",
      iconPosition: "right" as const,
    },
    {
      id: 2,
      question: "Our philosophy",
      answer: "The 15-minute rhythm keeps you grounded without interrupting flow. You're not tracking projects or clients. You're noting what you've been doing. Over time, patterns emerge. You see where energy goes. You make better decisions.",
    },
    {
      id: 3,
      question: "The mission",
      answer: "Help people stay present, avoid overwhelm, and gain real awareness of their work habits. No friction. No guilt. Just gentle nudges that become second nature. Because everyone deserves to know where their time goes.",
      icon: "🎯",
      iconPosition: "left" as const,
    },
    {
      id: 4,
      question: "Why 15 minutes?",
      answer: "It's the sweet spot. Short enough to keep you present, long enough to get meaningful work done. Tested for months to find the perfect balance between awareness and flow. Not too intrusive. Just right.",
    },
    {
      id: 5,
      question: "What makes it different?",
      answer: "No timers to start and stop. No complex categorization. No guilt about forgetting. Just a gentle ping, a quick note, and back to work. It works because it's simple. It sticks because it's effortless.",
      icon: "⚡",
      iconPosition: "right" as const,
    },
    {
      id: 6,
      question: "Who is it for?",
      answer: "Anyone who loses track of time. Freelancers, knowledge workers, students, founders. If you've ever wondered 'where did my day go?' this is for you. Built for humans, not managers.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Why Ormozy exists</h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">
          Spoiler: It's personal
        </p>
        
        <FaqAccordion 
          data={faqData}
          className="max-w-full"
          timestamp=""
        />
      </div>
    </section>
  );
};

export default WhyOrmozy;
