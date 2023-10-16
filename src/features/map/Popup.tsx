import { Popup as P } from "react-leaflet";
import { Arrests, Searches } from "../slices/crimeSlice";
import formatDateTime from "../../app/utils/dateTime";

type Props = { payload: Arrests | Searches };

const Popup = ({ payload }: Props) => {
  return (
    <P className="popup--text">
      <h4>{payload.type ? "person" : "vehicle"} Search</h4>

      {payload.type && payload.age_range && (
        <p>
          A {payload.gender ? payload.gender.toLowerCase() : "individual"}
          {payload.age_range.includes("over")
            ? ` ${payload.age_range} years`
            : `between the ages of ${payload.age_range}`}{" "}
          on the {formatDateTime(payload.datetime)}
        </p>
      )}

      <ul>
        <li>gender: {payload.gender || "Gender not provided"}</li>
        <li>involved_person: {payload.involved_person}</li>
        <li>legislation: {payload.legislation}</li>
        <li>location: {payload.location.street.name}</li>
        <li>object_of_search: {payload.object_of_search}</li>
        <li>officer_defined_ethnicity: {payload.officer_defined_ethnicity}</li>
        <li>operation: {payload.operation}</li>
        <li>operation_name: {payload.operation_name}</li>
        <li>outcome: {payload.outcome}</li>
        <li>
          outcome_linked_to_object_of_search:
          {payload.outcome_linked_to_object_of_search}
        </li>
        <li>outcome_object: {payload.outcome_object?.name}</li>
        <li>
          removal_of_more_than_outer_clothing:{" "}
          {payload.removal_of_more_than_outer_clothing}
        </li>
        <li>self_defined_ethnicity: {payload.self_defined_ethnicity}</li>
      </ul>
    </P>
  );
};

export default Popup;
