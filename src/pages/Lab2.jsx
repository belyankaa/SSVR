import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {
    getCoreRowModel,
    useReactTable,
    flexRender,
    getSortedRowModel,
} from "@tanstack/react-table";

const Lab2 = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const formSubmit = (data) => {
        console.log(data);
    };

    const startData = [
        {
            id: 1,
            name: 'Иван Иванов',
            age: 25,
            email: 'ivan@example.com',
        },
        {
            id: 2,
            name: 'Мария Петрова',
            age: 30,
            email: 'maria@example.com',
        },
        {
            id: 3,
            name: 'Алексей Сидоров',
            age: 28,
            email: 'alexey@example.com',
        },
    ]

    const [data, setData] = useState(startData);

    useEffect(() => {
        setTimeout(() => {
            setData(
                [...startData,
                    {
                        id: 4,
                        name: 'Мария Петрова',
                        age: 30,
                        email: 'maria@example.com',
                    },
                    {
                        id: 5,
                        name: 'Алексей Сидоров',
                        age: 28,
                        email: 'alexey@example.com',
                    }
                ]
            )
        }, 3000);

    }, []);

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Имя',
            accessorKey: 'name',
        },
        {
            header: 'Возраст',
            accessorKey: 'age',
        },
        {
            header: 'Email',
            accessorKey: 'email',
        },
    ];

    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        columns,
        data,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const cellStyle = {
        borderBottom: '1px solid white',
        color: 'black',
        background: 'white',
        padding: '8px',
    }
    return (
        <table style={{border: '1px solid white', width: '100%'}}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id} style={cellStyle}
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                ))}
            </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} style={cellStyle}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
            </tr>
        ))}
        </tbody>
    </table>
    )
};

export default Lab2;