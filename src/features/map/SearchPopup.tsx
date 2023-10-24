import { Searches } from "../slices/crimeSlice";

interface Props {
  payload: Searches;
}

const SearchPopup = ({ payload }: Props) => {
  console.log("search payload", payload);
  return (
    <ul>
      {payload?.age_range && (
        <li className="popup--list-item">Age: {payload.age_range}</li>
      )}
      {payload?.datetime && (
        <li className="popup--list-item">Date: {payload.datetime}</li>
      )}
      {payload?.gender && (
        <li className="popup--list-item">Gender: {payload.gender}</li>
      )}
      {payload?.involved_person && (
        <li className="popup--list-item">
          Person invloved: {payload.involved_person}
        </li>
      )}
      {payload?.legislation && (
        <li className="popup--list-item">Legislation: {payload.legislation}</li>
      )}
      {payload?.location?.street?.name && (
        <li className="popup--list-item">
          Street: {payload.location.street.name}
        </li>
      )}
      {payload.object_of_search && (
        <li className="popup--list-item">Object: {payload.object_of_search}</li>
      )}
      {payload?.officer_defined_ethnicity && (
        <li className="popup--list-item">
          officer ethnicity: {payload.officer_defined_ethnicity}
        </li>
      )}
      {payload?.operation && (
        <li className="popup--list-item">Operation: {payload.operation}</li>
      )}
      {payload?.operation_name && (
        <li className="popup--list-item">
          operation name: {payload.operation_name}
        </li>
      )}
      {payload?.outcome && (
        <li className="popup--list-item">outcome: {payload.outcome}</li>
      )}
      {payload?.outcome_linked_to_object_of_search && (
        <li className="popup--list-item">
          Outcome due to object: {payload.outcome_linked_to_object_of_search}
        </li>
      )}
      {payload?.outcome_object?.name && (
        <li className="popup--list-item">
          Object name: {payload.outcome_object.name}
        </li>
      )}
      {payload?.removal_of_more_than_outer_clothing && (
        <li className="popup--list-item">
          Strip search: {payload.removal_of_more_than_outer_clothing}
        </li>
      )}
      {payload?.self_defined_ethnicity && (
        <li className="popup--list-item">
          Suspects ethnicity: {payload.self_defined_ethnicity}
        </li>
      )}
    </ul>
  );
};

export default SearchPopup;
