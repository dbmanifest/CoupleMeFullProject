import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

export default function ProposalCard1({ data, onEdit, onDelete }) {
  return (
    <tr>
      <th className="ps-0" scope="row">
        <div className="freelancer-style1 p-0 mb-0 box-shadow-none">
          <div className="d-lg-flex align-items-lg-center">
            <div className="thumb w60 position-relative rounded-circle mb15-md">
              <Link href={data.src} target="blank">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={data.src}
                  alt="thumb"
                />
              </Link>
            </div>
          </div>
        </div>
      </th>
      <td>
        <h5 className="title mb-2">{data.name}</h5>
      </td>
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.description}
          </h5>
        </div>
      </td>
      <td>
        <div className="d-flex">
          <a
            className="mr-6"
            id={`edit-${data.id}`}
            data-bs-toggle="modal"
            data-bs-target="#editCompanionModal"
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
