import {
  fetchFilteredCustomers,
  fetchCustomersPages,
  type CustomerSort,
} from '@/app/lib/data';

import CustomersTable from '@/app/ui/customers/table';
import Pagination from '@/app/ui/invoices/pagination';
import { redirect } from 'next/navigation';

export default async function CustomersResults({
  query,
  currentPage,
  sort,
}: {
  query: string;
  currentPage: number;
  sort: CustomerSort;
}) {
  const totalPages = await fetchCustomersPages(query);

  if (currentPage > Math.max(totalPages, 1)) {
    const params = new URLSearchParams({
      query,
      sort,
      page: String(Math.max(totalPages, 1)),
    });

    redirect(`/dashboard/customers?${params.toString()}`);
  }

  const customers = await fetchFilteredCustomers(
    query,
    currentPage,
    sort,
  );

  return (
    <>
      <CustomersTable customers={customers} />

      {totalPages > 1 && (
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </>
  );
}