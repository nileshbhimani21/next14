"use client";
import { TableColumn, User, Tooltip } from "@nextui-org/react";
import { fetcher } from "@/helpers/utils";
import { TableWrapper } from "@components/table";
import { useCallback, useState } from "react";
import useSWR from "swr";
import { EyeIcon } from "@components/icons/table/eye-icon";
import { EditIcon } from "@components/icons/table/edit-icon";
import { DeleteIcon } from "@components/icons/table/delete-icon";
import ExportToXls from "@helpers/ExportToCsv";

export function AccountsPage() {
  const [filter, setFilter] = useState({
    sort: {},
    limit: 5,
    page: 1,
    total: 10,
    search: ""
  });
  console.log(filter, "filter");

  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users?_page=${filter?.page}&_limit=${filter?.limit}`,
    fetcher,
    { keepPreviousData: true }
  );

  const tableConstants = () => {
    return [
      {
        title: <TableColumn key="id">ID</TableColumn>,
        render: (row) => {
          return <span>{row?.id}</span>;
        }
      },
      {
        title: (
          <TableColumn allowsSorting={true} key="name">
            Name
          </TableColumn>
        ),
        render: (row) => {
          return (
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }}
              name={row?.name}
            >
              {row?.name}
            </User>
          );
        }
      },
      {
        title: <TableColumn key="username">Username</TableColumn>,
        render: (row) => {
          return <span>{row?.username ? row?.username : "NA"}</span>;
        }
      },
      {
        title: <TableColumn key="email">Email</TableColumn>,
        render: (row) => {
          return <span>{row?.email ? row?.email : "NA"}</span>;
        }
      },
      {
        title: <TableColumn key="phone">Phone</TableColumn>,
        render: (row) => {
          return <span>{row?.phone ? row?.phone : "NA"}</span>;
        }
      },
      {
        title: <TableColumn key="actions">Actions</TableColumn>,
        render: (row) => {
          return (
            <div className="flex items-center">
              <div className="flex items-center gap-4 ">
                <div>
                  <Tooltip content="Details">
                    <button onClick={() => console.log("View user", row.id)}>
                      <EyeIcon size={20} fill="#979797" />
                    </button>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip content="Edit user" color="secondary">
                    <button onClick={() => console.log("Edit user", row.id)}>
                      <EditIcon size={20} fill="#979797" />
                    </button>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip content="Delete user" color="danger">
                    <button onClick={() => console.log("Delete user", row.id)}>
                      <DeleteIcon size={20} fill="#FF0080" />
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>
          );
        }
      }
    ];
  };

  const onExport = useCallback(() => ExportToXls("nilesh.xls", data || []), []);

  return (
    <div className="p-6 flex flex-wrap gap-4 ">
      <h3 className="text-xl font-semibold">All Accounts</h3>
      <TableWrapper
        isLoading={isLoading}
        cols={tableConstants()}
        data={data}
        pages={filter?.total / filter?.limit}
        total={filter?.total}
        filter={filter}
        setFilter={setFilter}
        onExport={onExport}
      />
    </div>
  );
}
