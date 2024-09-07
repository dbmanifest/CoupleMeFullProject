// app/subscriptions/page.tsx
import dynamic from 'next/dynamic';

const Subscriptions = dynamic(() => import('./Subscriptions'));

export default function SubscriptionsPage() {
  return (
    <div>
      <Subscriptions />
    </div>
  );
}
