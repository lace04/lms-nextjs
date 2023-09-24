import { getChaper } from '@/actions/get-chapter';
import Banner from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { VideoPlayer } from './_components/video-player';

const ChaperIdPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) return redirect('/');

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChaper({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) return redirect('/');

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant='success' label='¡Capítulo completado!' />
      )}
      {isLocked && (
        <Banner
          variant='warning'
          label='Necesitas comprar este curso para ver este capítulo.'
        />
      )}
      <div className='flex flex-col max-w-4xl mx-auto pb-20'>
        <div className='p-4'>
          <VideoPlayer
            courseId={params.courseId}
            chapterId={params.chapterId}
            title={chapter.title}
            nextChapter={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default ChaperIdPage;
