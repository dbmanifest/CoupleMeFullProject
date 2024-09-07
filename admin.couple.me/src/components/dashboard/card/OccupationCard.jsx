import Image from "next/image";
import { Tooltip } from "react-tooltip";

export default function StyleCard({ data, onEdit, onDelete }) {
  return (
    <tr>
      <td className="">
        <h5 className="title mb-2">{data.label}</h5>
      </td>
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.value}
          </h5>
        </div>
      </td>
      <td className="">
        <div className="d-flex justify-content-end">
          <a
            className="mr-6"
            id={`edit-${data.id}`}
            data-bs-toggle="modal"
            data-bs-target="#proposalModal"
            onClick={onEdit}
          >
            <Tooltip anchorSelect={`#edit-${data.id}`} className="ui-tooltip">
              Edit
            </Tooltip>
            <span className="flaticon-pencil" />
          </a>
          <a
            id={`delete-${data.id}`}
            data-bs-toggle="modal"
            data-bs-target="#deleteModal"
            onClick={onDelete}
          >
            <Tooltip anchorSelect={`#delete-${data.id}`} className="ui-tooltip">
              Delete
            </Tooltip>
            <span className="flaticon-delete" />
          </a>
        </div>
      </td>
    </tr>

  );
}
