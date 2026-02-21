export interface MembershipCardProps {
  name: string;
  duration: string;
  price: string;
  savings: string;
  note: string;
}

export default function GymMembershipCard({ name, duration, price, savings, note }: MembershipCardProps) {
  return (
    <div className="rounded-md bg-white/90 p-8 text-center shadow-lg shadow-brand-900/10 md:text-left">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-600">{name}</p>
      <p className="mt-2 text-sm font-semibold text-brand-500">{duration}</p>
      <p className="mt-3 text-3xl font-extrabold text-brand-900">{price}</p>
      <p className="mt-1 text-sm font-semibold text-brand-600">{savings}</p>
      <p className="mt-4 text-sm text-brand-700">{note}</p>
    </div>
  );
}
