'use client';

import * as z from 'zod';
import axios from 'axios';
import MuxPlayer from '@mux/mux-player-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Video } from 'lucide-react';
import toast from 'react-hot-toast';
import { Chapter, MuxData } from '@prisma/client';
import { FileUpload } from '@/components/file-upload';

interface ChapterVideoFormProps {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});

export const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}`,
        values
      );
      toast.success('Capítulo actualizado');
      toggleEdit();
      router.refresh();
    } catch {
      toast.error('Ocurrió un error');
    }
  };

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Video del capítulo
        <Button onClick={toggleEdit} variant='ghost'>
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='h-4 w-4 mr-2' />
              Agregar video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className='h-4 w-4 mr-2' />
              Editar
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <Video className='h-10 w-10 text-slate-500' />
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <MuxPlayer playbackId={initialData?.muxData?.playbackId || ''} />
          </div>
        ))}
      {isEditing && (
        <div className=''>
          <FileUpload
            endpoint='chapterVideo'
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className='text-sm text-muted-foreground mt-4'>
            <p>Subir el video de este capítulo.</p>
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className='text-xs text-muted-foreground mt-2'>
          "Los videos pueden tardar unos minutos en procesarse. Refresca la
          página si el video no aparece."
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
