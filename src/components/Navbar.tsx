import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Lenis-compatible shim so the rest of the codebase can call smoother.paused()
export let smoother = {
  _lenis: null as Lenis | null,
  paused(v: boolean) {
    if (!this._lenis) return;
    v ? this._lenis.stop() : this._lenis.start();
  },
  scrollTop(v: number) {
    if (!this._lenis) return;
    this._lenis.scrollTo(v, { immediate: true });
  },
  scrollTo(target: string | null, _smooth: boolean, _offset: string) {
    if (!this._lenis || !target) return;
    const el = document.querySelector(target);
    if (el) this._lenis.scrollTo(el as HTMLElement, { offset: 0 });
  },
};

const Navbar = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    smoother._lenis = lenis;
    smoother.scrollTop(0);
    smoother.paused(true);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time: number) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    let links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          smoother.scrollTo(section, true, "top top");
        }
      });
    });

    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          VISHESH
        </a>
        <a
          href="mailto:visheshnigam27@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          visheshnigam27@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
