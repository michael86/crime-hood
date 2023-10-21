import { Arrests } from "../slices/crimeSlice";

interface Props {
  payload: Arrests;
}

const ArrestPopup = ({ payload }: Props) => {
  return (
    <ul>
      <li className="popup--list-item">Category: {payload.category}</li>
      <li className="popup--list-item">context: {payload.context}</li>
      <li className="popup--list-item">id: {payload.id}</li>
      <li className="popup--list-item">
        street name: {payload.location.street.name}
      </li>
      <li className="popup--list-item">
        location subtype: {payload.location_subtype}
      </li>
      <li className="popup--list-item">
        location type: {payload.location_type}
      </li>
      <li className="popup--list-item">month: {payload.month}</li>
      <li className="popup--list-item">
        outcome category: {payload.outcome_status.category}
      </li>
      <li className="popup--list-item">
        outcome date: {payload.outcome_status.date}
      </li>
      <li className="popup--list-item">
        persistant id: {payload.persistent_id}
      </li>
    </ul>
  );
};

export default ArrestPopup;
