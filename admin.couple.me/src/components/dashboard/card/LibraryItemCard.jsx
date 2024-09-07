import { Tooltip } from "react-tooltip";

export default function LibraryItemCard({ data, onEdit, onDelete }) {

  console.log(data, "dataaaaaaaaaaaaaaaaaa");


  return (
    <tr>
      {/* New Description Column */}
      <td className="">
        <h5 className="title mb-2">{data.userId}</h5>
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
