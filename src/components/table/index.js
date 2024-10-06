import { ExportIcon } from "@components/icons/accounts/export-icon";
import { SearchIcon } from "@components/icons/searchicon";

import {
  Button,
  Input,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import { useCallback } from "react";

export const TableWrapper = ({ setFilter, filter, cols, data, total, pages, isLoading, onExport }) => {
  const onRowsPerPageChange = useCallback((e) => {
    setFilter({ ...filter, limit: Number(e.target.value), page: 1 });
  }, []);
  const onSortChange = useCallback((item) => {
    setFilter({ ...filter, sort: item });
  }, []);

  const onChange = useCallback((newPage) => {
    setFilter({ ...filter, page: newPage });
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilter({ ...filter, search: value, page: 1 });
    } else {
      setFilter({ ...filter, search: "" });
    }
  }, []);

  const loadingState = isLoading || data?.length === 0 ? "loading" : "idle";

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        onSortChange={onSortChange}
        sortDescriptor={filter?.sort}
        topContentPlacement="outside"
        topContent={
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                classNames={{
                  base: "w-full sm:max-w-[44%]"
                }}
                placeholder="Search by name..."
                size="sm"
                startContent={<SearchIcon className="text-default-300" />}
                value={filter?.search}
                onClear={() => setFilter({ ...filter, search: "" })}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Button color="primary" size="sm" startContent={<ExportIcon />} onClick={onExport}>
                  Export
                </Button>
              </div>
            </div>
          </div>
        }
        bottomContent={
          pages > 0 ? (
            <div className="py-2 px-2 flex justify-between items-center">
              <Pagination showControls color="primary" page={filter?.page} total={pages} onChange={onChange} />
              <div className="flex gap-2 items-center">
                <span className="text-default-400 text-small">
                  <b>Total {total}</b>
                </span>
                <Select
                  label="Rows"
                  size="sm"
                  className="max-w-sm w-20"
                  defaultSelectedKeys={[filter?.limit.toString()]}
                  onChange={onRowsPerPageChange}
                >
                  <SelectItem key={"5"}>5</SelectItem>
                  <SelectItem key={"10"}>10</SelectItem>
                  <SelectItem key={"15"}>15</SelectItem>
                </Select>
              </div>
            </div>
          ) : null
        }
      >
        <TableHeader>{cols?.map((headerItem) => headerItem.title)}</TableHeader>
        <TableBody
          loadingContent={<Spinner />}
          emptyContent={"Data not available!"}
          loadingState={loadingState}
          items={data ?? []}
        >
          {(item, index) => (
            <TableRow key={index}>
              {cols?.map((col, key) => (
                <TableCell key={key}> {col.render(item)}</TableCell>
              ))}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
