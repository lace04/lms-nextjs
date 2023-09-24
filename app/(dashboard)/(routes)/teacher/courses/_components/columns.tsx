'use client';

import { Button } from '@/components/ui/button';
import { Course } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { ArrowUpDown, MoreHorizontal, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Curso
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Precio
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price') || '0');
      const formatted = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
      }).format(price);

      return <span>{formatted}</span>;
    }
  },
  {
    accessorKey: 'isPublished',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Publicado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue('isPublished') || false;

      return (
        <Badge className={cn('bg-slate-500', isPublished && 'bg-sky-700')}>
          {isPublished ? 'Publicado' : 'Sin publicar'}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-4 w-8 p-0'>
              <span className='sr-only'>Abrir menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <Link href={`/teacher/courses/${id}`}>
              <DropdownMenuItem className='flex items-center'>
                <Pencil className='h-4 w-4 mr-2' />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
