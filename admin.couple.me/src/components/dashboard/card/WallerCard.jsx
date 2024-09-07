import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

export default function WalletCard({ data, onEdit, onDelete }) {
  return (
    <tr>
      <th className="ps-0" scope="row">
       
      </th>
      {/* New Description Column */}
      <td>
        <h5 className="title mb-2">{data.userId}</h5>
      </td>
      {/* New Image Column */}
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.balance}
          </h5>
        </div>
      </td>
      <td className="text-right">
        {" "}
        {/* Align action buttons to the right */}
        <div className="d-flex justify-content-end">
          {" "}
          {/* Push buttons to the right */}
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
