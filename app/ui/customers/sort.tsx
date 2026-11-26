'use client';

import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

import type { CustomerSort } from '@/app/lib/data';

export default function CustomerSortSelect({
  sort,
}: {
  sort: CustomerSort;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSort(value: string) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', value);
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <label htmlFor="customer-sort" className="sr-only">
        Sort customers
      </label>

      <select
        id="customer-sort"
        value={sort}
        onChange={(e) => handleSort(e.target.value)}
        className="w-full rounded-md border border-gray-200
                   bg-white px-3 py-[9px] text-sm"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="paid-desc">Paid (Highest first)</option>
        <option value="paid-asc">Paid (Lowest first)</option>
        <option value="pending-desc">Pending (Highest first)</option>
        <option value="pending-asc">Pending (Lowest first)</option>
      </select>
    </div>
  );
}