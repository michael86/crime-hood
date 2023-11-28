import { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import "./page_select.css";
import { setPage } from "../slices/userSlice";

const PageSelect = () => {
  const dispatch = useAppDispatch();
  const { arrests, searches } = useAppSelector((state) => state.crimes);

  const pageCount =
    arrests.length > searches.length ? arrests.length : searches.length;

  const dispatchPage = (page: number) => dispatch(setPage(page));
  return pageCount > 1 ? (
    <div className="page-select--container">
      <ul>
        {Array.from(Array(pageCount)).map((_, i) => (
          <li onClick={() => dispatchPage(i)}>{i + 1}</li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default PageSelect;
