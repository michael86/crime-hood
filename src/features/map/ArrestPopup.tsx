import { Arrests } from "../slices/crimeSlice";

interface Props {
  payload: Arrests;
}

const ArrestPopup = ({ payload }: Props) => {
  return (
    <ul>
      <li>Category: {payload.category}</li>
      <li>context: {payload.context}</li>
      <li>id: {payload.id}</li>
      <li>street name: {payload.location.street.name}</li>
      <li>location subtype: {payload.location_subtype}</li>
      <li>location type: {payload.location_type}</li>
      <li>month: {payload.month}</li>
      <li>outcome category: {payload.outcome_status.category}</li>
      <li>outcome date: {payload.outcome_status.date}</li>
      <li>persistant id: {payload.persistent_id}</li>
    </ul>
  );
};

export default ArrestPopup;
