import React, { useRef, useState, useLayoutEffect } from "react";
import { useMap } from "react-leaflet";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setDate,
  setLimit,
  setShowCrimes,
  setShowSearches,
} from "../slices/userSlice";

const Sidebar = () => {
  const map = useMap();
  const [shown, setShown] = useState<boolean>(false);

  const ref = useRef<HTMLUListElement>(null);
  const tl = useRef<GSAPTimeline>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);

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

  const onFilter = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    e.preventDefault();
    const key = target.getAttribute("name")!;
    const value = target.checked;

    key === "crimes"
      ? dispatch(setShowCrimes(value))
      : dispatch(setShowSearches(value));
  };

  const onLimit = (e: React.ChangeEvent<HTMLSelectElement>) =>
    dispatch(setLimit(+e.target.value));

  const getCurrentMonth = (): string => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  };

  const [currentDate, setCurrentDate] = useState<string>(
    Object.keys(user.date!).length > 0
      ? `${user.date!.year}-${user.date!.month}`
      : getCurrentMonth()
  ); //Need to put this back up top once util file created

  const dispatchDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setCurrentDate(value);

    const date = new Date(value);
    const month = date.getMonth();
    const year = date.getFullYear();
    dispatch(setDate({ month, year }));
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

        <li className="sidebar--item">
          <label htmlFor="limit">Amount to Show</label>
          <select name="limit" id="limit" onChange={onLimit}>
            <option value="0">All</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </li>

        <li className="sidebar--item">
          <input
            key={Math.random()}
            type="checkbox"
            name="crimes"
            id="show-crimes"
            onChange={onFilter}
            defaultChecked={user.crimes}
          />
          <label htmlFor="show-crimes">Show Crimes</label>
        </li>
        <li className="sidebar--item">
          <input
            key={Math.random()}
            type="checkbox"
            name="searches"
            id="show-searches"
            onChange={onFilter}
            defaultChecked={user.searches}
          />
          <label htmlFor="show-searches">Show Searches</label>
        </li>
        <li className="sidebar--item">
          <label htmlFor="date-range"></label>
          <input
            type="month"
            name="date-range"
            id="date-range"
            value={currentDate}
            onChange={dispatchDate}
          />
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
