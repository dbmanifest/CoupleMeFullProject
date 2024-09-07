import { Tooltip } from "react-tooltip";

export default function MessageCard({ data, onEdit, onDelete }) {

  console.log(data, "dataaaaaaaaaaaaaaaaaa");
  

  return (
    <tr>
      {/* New Description Column */}
      <td className="">
        <h5 className="title mb-2">{data.userId}</h5>
      </td>
      {/* New Image Column */}
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.companionId}
          </h5>
        </div>
      </td>
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.role}
          </h5>
        </div>
      </td>
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.content}
          </h5>
        </div>
      </td>
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.updatedAt}
          </h5>
        </div>
      </td>
      <td className="">
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">
            {data.createdAt}
          </h5>
        </div>
      </td>
      {/* Actions Column */}
    </tr>

  );
}
