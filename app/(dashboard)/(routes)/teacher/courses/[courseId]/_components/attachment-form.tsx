'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { File, ImageIcon, Loader2, Pencil, PlusCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { Attachment, Course } from '@prisma/client';
import { FileUpload } from '@/components/file-upload';

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success('Curso actualizado');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Ocurrió un error');
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success('Archivo eliminado');
      router.refresh();
    } catch (error) {
      toast.error('Ocurrió un error');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Archivos del Curso
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancelar</>}
          {!isEditing && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Agregar un archivo
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className='text-sm mt-2 text-slate-500 italic'>
              No hay archivos.
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className='space-y-2'>
              {initialData.attachments.map((attachment) => (
                <div
                  className='flex items-center p-3 w-full bg-sky-100 border-sky-200 text-sky-700 rounded-md'
                  key={attachment.id}
                >
                  <File className='h-4 w-4 mr-2 flex-shrink-0' />
                  <p className='text-xs line-clamp-1'>{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div className='ml-auto'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className='ml-auto hover:opacity-75 transition'
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div className=''>
          <FileUpload
            endpoint='courseAttachment'
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className='text-sm text-muted-foreground mt-4'>
            Agregue todo lo que sus estudiantes puedan necesitar para completar
            el curso.
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
