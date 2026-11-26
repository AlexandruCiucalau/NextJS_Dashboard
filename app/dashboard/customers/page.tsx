import { Metadata } from 'next';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import CustomerSortSelect from '@/app/ui/customers/sort';
import CustomersResults from '@/app/ui/customers/results';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';

import type { CustomerSort } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

const validSorts: CustomerSort[] = [
  'name-asc',
  'name-desc',
  'paid-asc',
  'paid-desc',
  'pending-asc',
  'pending-desc',
];

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    sort?: string;
  }>;
}) {
  const searchParams = await props.searchParams;

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page ?? 1);

  const requestedSort = searchParams?.sort as CustomerSort;

  const sort = validSorts.includes(requestedSort)
    ? requestedSort
    : 'name-asc';

  if (!Number.isSafeInteger(currentPage) || currentPage < 1) {
    const params = new URLSearchParams({
      query,
      sort,
      page: '1',
    });

    redirect(`/dashboard/customers?${params.toString()}`);
  }

  return (
    <div className="w-full">
      <h1
        className={`${lusitana.className} mb-8 text-xl md:text-2xl`}
      >
        Customers
      </h1>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <Search placeholder="Search customers..." />

        <CustomerSortSelect sort={sort} />
      </div>

      <Suspense
        key={JSON.stringify([query, currentPage, sort])}
        fallback={<CustomersTableSkeleton />}
      >
        <CustomersResults
          query={query}
          currentPage={currentPage}
          sort={sort}
        />
      </Suspense>
    </div>
  );
}