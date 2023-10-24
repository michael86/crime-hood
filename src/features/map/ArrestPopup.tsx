import { Arrests } from "../slices/crimeSlice";

interface Props {
  payload: Arrests;
}

const ArrestPopup = ({ payload }: Props) => {
  console.log("arrest payload", payload.month);
  return (
    <>
      <ul>
        {payload?.category && (
          <li className="popup--list-item">Category: {payload.category}</li>
        )}
        {payload?.context && (
          <li className="popup--list-item">context: {payload.context}</li>
        )}
        {payload?.id && <li className="popup--list-item">id: {payload.id}</li>}
        {payload?.location?.street && (
          <li className="popup--list-item">
            street name: {payload.location.street.name}
          </li>
        )}
        {payload?.location_subtype && (
          <li className="popup--list-item">
            location subtype: {payload.location_subtype}
          </li>
        )}
        {payload?.location_type && (
          <li className="popup--list-item">
            location type: {payload.location_type}
          </li>
        )}
        {payload?.month && (
          <li className="popup--list-item">month: {payload?.month}</li>
        )}
        {payload?.outcome_status?.category && (
          <li className="popup--list-item">
            outcome category: {payload.outcome_status.category}
          </li>
        )}
        {payload?.outcome_status?.date && (
          <li className="popup--list-item">
            outcome date: {payload.outcome_status.date}
          </li>
        )}
      </ul>
      {payload?.persistent_id && <button>View latest status</button>}
    </>
  );
};

export default ArrestPopup;
