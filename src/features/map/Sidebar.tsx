import { useRef, useState, useLayoutEffect } from "react";
import { useMap } from "react-leaflet";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setShowCrimes, setShowSearches } from "../slices/userSlice";

const Sidebar = () => {
  const map = useMap();
  const [shown, setShown] = useState<boolean>(false);
  const ref = useRef<HTMLUListElement>(null);
  const tl = useRef<GSAPTimeline>();
  const dispatch = useAppDispatch();

  const { crimes: showCrimes, searches: showSearches } = useAppSelector(
    (state) => state.user
  );

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

  const onFilter = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target = e.target as HTMLInputElement;
    e.preventDefault();
    const key = target.getAttribute("name")!;
    const value = target.checked;

    console.log("value", value);
    key === "crimes"
      ? dispatch(setShowCrimes(!value))
      : dispatch(setShowSearches(!value));
  };

  console.log(showCrimes);
  console.log(showSearches);
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
        <li className="sidebar--item">
          <input
            type="checkbox"
            name="crimes"
            id="show-crimes"
            onClick={onFilter}
            checked={showCrimes}
          />
          <label htmlFor="show-crimes">Show Crimes</label>
        </li>
        <li className="sidebar--item">
          <input
            type="checkbox"
            name="searches"
            id="show-searches"
            onClick={onFilter}
            checked={showSearches}
          />
          <label htmlFor="show-searches">Show Searches</label>
        </li>
        <li className="sidebar--item">menu item four</li>
      </ul>
    </>
  );
};

export default Sidebar;
