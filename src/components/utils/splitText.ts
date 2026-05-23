import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Custom SplitText replacement ──────────────────────────────────────────────
export class SplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originals: { el: HTMLElement; html: string }[] = [];

  constructor(
    targets: string | HTMLElement | (HTMLElement | string)[],
    options: { type?: string; linesClass?: string } = {}
  ) {
    const type = options.type ?? "chars,words";
    const els = this.resolve(targets);
    els.forEach((el) => {
      this.originals.push({ el, html: el.innerHTML });
      const text = el.innerText;
      const wordEls: HTMLElement[] = [];

      const wordTokens = text.split(/\s+/);
      el.innerHTML = "";

      wordTokens.forEach((word, wi) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.style.overflow = "hidden";
        if (options.linesClass) wordSpan.classList.add(options.linesClass);

        if (type.includes("chars")) {
          [...word].forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.style.display = "inline-block";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          });
        } else {
          wordSpan.textContent = word;
        }

        el.appendChild(wordSpan);
        wordEls.push(wordSpan);
        if (wi < wordTokens.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      this.words.push(...wordEls);
      this.lines.push(...wordEls);
    });
  }

  revert() {
    this.originals.forEach(({ el, html }) => {
      el.innerHTML = html;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }

  private resolve(
    targets: string | HTMLElement | (HTMLElement | string)[]
  ): HTMLElement[] {
    const arr = Array.isArray(targets) ? targets : [targets];
    const result: HTMLElement[] = [];
    arr.forEach((t) => {
      if (typeof t === "string") {
        document.querySelectorAll<HTMLElement>(t).forEach((el) => result.push(el));
      } else {
        result.push(t);
      }
    });
    return result;
  }
}

// ── Scroll-triggered text animations ─────────────────────────────────────────
interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
