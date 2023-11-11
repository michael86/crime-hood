import {
  useRef,
  useState,
  LegacyRef,
  MutableRefObject,
  useLayoutEffect,
} from "react";
import { useMap } from "react-leaflet";
import { gsap } from "gsap";

const Sidebar = () => {
  const map = useMap();
  const [shown, setShown] = useState<boolean>(false);
  const ref = useRef<HTMLUListElement>(null);
  const tl = useRef<GSAPTimeline>();

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true })
        .fromTo(
          ref.current,
          {
            x: -100,
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
          }
        )
        .fromTo(
          Array.from(ref.current!.children),
          {
            y: -20,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.2,
          }
        );
    }, [ref.current]);

    return () => ctx.revert();
  }, []);

  const onShow = () => {
    !shown ? tl.current?.play() : tl.current?.reverse();
    setShown(!shown);
  };

  return (
    <>
      <div className="hamburger" onClick={onShow}>
        <div className="hamburger--line"></div>
        <div className="hamburger--line"></div>
        <div className="hamburger--line"></div>
      </div>

      <ul className="sidebar" ref={ref}>
        <li className="sidebar--close" onClick={onShow}>
          <span className="close--line"></span>
          <span className="close--line"></span>
        </li>
        <li className="sidebar--item">menu item one</li>
        <li className="sidebar--item">menu item two</li>
        <li className="sidebar--item">menu item three</li>
        <li className="sidebar--item">menu item four</li>
      </ul>
    </>
  );
};

export default Sidebar;
