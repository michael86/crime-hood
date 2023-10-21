import { Searches } from "../slices/crimeSlice";

interface Props {
  payload: Searches;
}

const SearchPopup = ({ payload }: Props) => {
  return (
    <ul>
      <li className="popup--list-item">Age: {payload.age_range}</li>
      <li className="popup--list-item">Date: {payload.datetime}</li>
      <li className="popup--list-item">Gender: {payload.gender}</li>
      <li className="popup--list-item">
        Person invloved: {payload.involved_person}
      </li>
      <li className="popup--list-item">Legislation: {payload.legislation}</li>
      <li className="popup--list-item">
        Street: {payload.location.street.name}
      </li>
      <li className="popup--list-item">Object: {payload.object_of_search}</li>
      <li className="popup--list-item">
        officer ethnicity: {payload.officer_defined_ethnicity}
      </li>
      <li className="popup--list-item">Operation: {payload.operation}</li>
      <li className="popup--list-item">
        operation name: {payload.operation_name}
      </li>
      <li className="popup--list-item">outcome: {payload.outcome}</li>
      <li className="popup--list-item">
        Outcome due to object: {payload.outcome_linked_to_object_of_search}
      </li>
      <li className="popup--list-item">
        Object name: {payload.outcome_object?.name}
      </li>
      <li className="popup--list-item">
        Strip search: {payload.removal_of_more_than_outer_clothing}
      </li>
      <li className="popup--list-item">
        Suspects ethnicity: {payload.self_defined_ethnicity}
      </li>
    </ul>
  );
};

export default SearchPopup;
