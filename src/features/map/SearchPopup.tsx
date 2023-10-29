import formatDateTime from "../../app/utils/dateTime";
import { SearchPopupProps } from "../../interfaces";
import "./map.css";

const SearchPopup = ({ payload }: SearchPopupProps) => {
  return (
    <ul>
      <li className="popup--list-item popup--divider capitalize">Suspect</li>

      {payload?.age_range && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Age:</span> {payload?.age_range}
        </li>
      )}

      {payload?.gender && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Gender:</span> {payload?.gender}
        </li>
      )}

      {payload?.self_defined_ethnicity && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">ethnicity:</span>{" "}
          {payload.self_defined_ethnicity}
        </li>
      )}

      <li className="popup--list-item popup--divider capitalize">Search details</li>

      {payload?.datetime && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Date:</span> {formatDateTime(payload?.datetime)}
        </li>
      )}

      {typeof payload?.involved_person === "boolean" && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Type of search:</span>{" "}
          {payload?.involved_person ? "Person" : "Vehicle"}
        </li>
      )}

      {payload?.legislation && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Legislation:</span> {payload?.legislation}
        </li>
      )}

      {payload?.location?.street?.name && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Street:</span> {payload.location.street.name}
        </li>
      )}

      {payload.object_of_search && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Object:</span> {payload.object_of_search}
        </li>
      )}

      {payload?.operation && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Operation:</span> {payload.operation}
        </li>
      )}

      {payload?.operation_name && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">operation name:</span> {payload.operation_name}
        </li>
      )}

      {payload?.outcome && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">outcome:</span>{" "}
          {payload.outcome && payload.outcome.length > 1
            ? payload.outcome
            : payload.outcome && payload.outcome.length === 0
            ? "Outcome not provided"
            : "nothing found, suspect released"}
        </li>
      )}
      {payload?.outcome_linked_to_object_of_search && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Outcome due to object:</span>{" "}
          {payload.outcome_linked_to_object_of_search}
        </li>
      )}

      {payload?.removal_of_more_than_outer_clothing && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">Strip search:</span>{" "}
          {payload.removal_of_more_than_outer_clothing}
        </li>
      )}

      <li className="popup--list-item popup--divider capitalize">Officer</li>
      {payload?.officer_defined_ethnicity && (
        <li className="popup--list-item">
          <span className="capitalize popup--title">officer ethnicity:</span>{" "}
          {payload.officer_defined_ethnicity}
        </li>
      )}
    </ul>
  );
};

export default SearchPopup;
