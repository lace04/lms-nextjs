'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Trash } from 'lucide-react';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useConfettiStore } from '@/hooks/use-confetti-store';

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}
export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success('Capítulo no publicado');
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success('Capítulo publicado');
        confetti.onOpen();
      }
      router.refresh();
    } catch (error) {
      toast.error('Error al publicar');
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success('Curso eliminado');
      router.refresh();
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error('Error al eliminar');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant='outline'
        size='sm'
      >
        {isPublished ? 'No publicar' : 'Publicar'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size='sm' disabled={isLoading}>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  );
};
