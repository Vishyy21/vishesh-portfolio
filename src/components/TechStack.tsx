import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";
import "./styles/TechStack.css";

gsap.registerPlugin(ScrollTrigger);

const techCategories1 = [
  { title: "Languages", skills: ["Python", "SQL", "JavaScript", "C++"] },
  { title: "Libraries", skills: ["Pandas", "NumPy", "scikit-learn", "Jupyter"] },
  { title: "Databases", skills: ["MySQL", "PostgreSQL", "MongoDB"] },
];

const techCategories2 = [
  { title: "Analytics Tools", skills: ["Power BI", "Tableau", "Excel"] },
  { title: "Concepts", skills: ["ROI Analysis", "Data Cleaning", "Data Mining", "BI", "KPI Tracking"] },
  { title: "Web Dev", skills: ["React", "Node.js", "Express", "REST APIs"] },
];

const TechCard = ({ category }: { category: any }) => (
  <div className="tech-marquee-card">
    <h3>{category.title}</h3>
    <div className="tech-skills-flex">
      {category.skills.map((skill: string, i: number) => (
        <span className="tech-skill-tag" key={i}>
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const TechStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tech-marquee-container",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="techstack-section" ref={sectionRef}>
      <h2>
        My <span>Techstack</span>
      </h2>
      <div className="tech-marquee-wrapper">
        <div className="tech-marquee-container">
          <Marquee speed={40} gradient={false} pauseOnHover={true}>
            {/* Duplicated manually to ensure seamless loop with fewer items */}
            {techCategories1.map((cat, i) => (
              <TechCard category={cat} key={`row1-a-${i}`} />
            ))}
            {techCategories1.map((cat, i) => (
              <TechCard category={cat} key={`row1-b-${i}`} />
            ))}
          </Marquee>
        </div>
        <div className="tech-marquee-container">
          <Marquee speed={40} direction="right" gradient={false} pauseOnHover={true}>
            {techCategories2.map((cat, i) => (
              <TechCard category={cat} key={`row2-a-${i}`} />
            ))}
            {techCategories2.map((cat, i) => (
              <TechCard category={cat} key={`row2-b-${i}`} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
