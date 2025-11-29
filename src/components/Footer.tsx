import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  const sections = [
    {
      title: "Product",
      links: [
        { name: "Features", path: "#features" },
        { name: "Why Free", path: "#comparison" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", path: "/privacy" },
        { name: "Terms", path: "/terms" }
      ]
    }
  ];

  return (
    <footer className="bg-muted py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Ormozy" className="h-12 w-12 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simple time tracking that helps you stay present and understand your work patterns.
            </p>
          </div>
          
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.path.startsWith('/') ? (
                      <Link to={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
                    ) : (
                      <a href={link.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © 2025 Ormozy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
