import { ArrestPopupProps } from "../../interfaces";

const ArrestPopup = ({ payload }: ArrestPopupProps) => {
  return (
    <>
      <ul>
        {payload?.category && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">Crime Type:</span> {payload.category}
          </li>
        )}

        {payload?.context && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">Extra information:</span> {payload.context}
          </li>
        )}

        {payload?.location?.street && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">street name:</span>{" "}
            {payload.location.street.name}
          </li>
        )}

        {payload?.location_type && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">Force:</span>{" "}
            {payload.location_type.toLowerCase() === "force" ? "Standard" : "British Transport"}
          </li>
        )}

        {payload?.location_type?.toLowerCase() === "btp" && payload?.location_subtype && (
          <li className="popup--list-item"> subtype: {payload.location_subtype}</li>
        )}

        {payload?.month && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">month:</span> {payload?.month}
          </li>
        )}

        {payload?.outcome_status?.category && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">outcome category:</span>{" "}
            {payload.outcome_status.category}
          </li>
        )}

        {payload?.outcome_status?.date && (
          <li className="popup--list-item">
            <span className="popup--title capitalize">outcome date:</span>{" "}
            {payload.outcome_status.date}
          </li>
        )}
      </ul>
      {payload?.persistent_id && <button>View latest status</button>}
    </>
  );
};

export default ArrestPopup;
