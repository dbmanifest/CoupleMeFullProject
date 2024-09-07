import Image from "next/image";
import { Tooltip } from "react-tooltip";

export default function HairColorCard({ data, onEdit, onDelete }) {
  return (
    <tr>
      <th className="ps-0" scope="row">
        <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
          <div className="d-lg-flex align-items-lg-center">
            <div className="thumb w60 position-relative rounded-circle mb15-md">
              <div
                className="h-16 w-16 border-2 border-black"
                style={{ backgroundColor: data.src }}
              ></div>
              <span className="online-badge2" />
            </div>
          </div>
        </div>
      </th>
      {/* New Description Column */}
      <td className="">
        <h5 className="title mb-2">{data.label}</h5>
      </td>
      {/* New Image Column */}
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.value}
          </h5>
        </div>
      </td>
      {/* Actions Column */}
      <td className="text-right">
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
