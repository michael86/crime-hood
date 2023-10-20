import { Searches } from "../slices/crimeSlice";

interface Props {
  payload: Searches;
}

const SearchPopup = ({ payload }: Props) => {
  return (
    <ul>
      <li>Age: {payload.age_range}</li>
      <li>Date: {payload.datetime}</li>
      <li>Gender: {payload.gender}</li>
      <li>Person invloved: {payload.involved_person}</li>
      <li>Legislation: {payload.legislation}</li>
      <li>Street: {payload.location.street.name}</li>
      <li>Object: {payload.object_of_search}</li>
      <li>officer ethnicity: {payload.officer_defined_ethnicity}</li>
      <li>Operation: {payload.operation}</li>
      <li>operation name: {payload.operation_name}</li>
      <li>outcome: {payload.outcome}</li>
      <li>
        Outcome due to object: {payload.outcome_linked_to_object_of_search}
      </li>
      <li>Object name: {payload.outcome_object?.name}</li>
      <li>Strip search: {payload.removal_of_more_than_outer_clothing}</li>
      <li>Suspects ethnicity: {payload.self_defined_ethnicity}</li>
    </ul>
  );
};

export default SearchPopup;
