import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";

export default function SubscriptionCard({ data, onEdit, onDelete }) {
  return (
    <tr>
      {/* New Description Column */}
      <td>
        <h5 className="title mb-2">{data.userId}</h5>
      </td>
      {/* New Image Column */}
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">{data.stripeCustomerId}</h5>
        </div>
      </td>
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">{data.stripeSubscriptionId}</h5>
        </div>
      </td>
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">{data.stripePriceId}</h5>
        </div>
      </td>
      <td>
        <div className="details ml15 ml0-md mb15-md">
          <h5 className="mb-0 fz14 list-inline-item mb5-sm pe-1">{data.stripeCurrentPeriodEnd}</h5>
        </div>
      </td>
     
    </tr>

  );
}
