import { getCurrentMonth } from "./utils";

const Error = () => {
  let { year, month } = getCurrentMonth(true) as { year: number; month: number };
  month = month - 2;
  return (
    <>
      <div className="error--container">
        <p className="error--title">No data found!</p>
        <p className="error--title">Our data is served 2 months in areas.</p>
        <p className="error--title"> The closest data available is {`${year}-${month}`}</p>
      </div>
    </>
  );
};

export default Error;
