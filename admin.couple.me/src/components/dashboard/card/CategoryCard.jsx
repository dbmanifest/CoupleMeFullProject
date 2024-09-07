import Image from "next/image";
import { Tooltip } from "react-tooltip";

export default function CategoryCard({ data, onEdit, onDelete }) {
  return (
    <tr className="">
  <th className="ps-0" scope="row">
    <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
      <div className="d-lg-flex align-items-lg-center">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="title mb-2">{data.name}</h5>
        </div>
      </div>
    </div>
  </th>
  <td className="text-right"> {/* Align the content to the right */}
    <div className="d-flex justify-content-end"> {/* Push the buttons to the right */}
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
