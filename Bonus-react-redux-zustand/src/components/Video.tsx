import ReactPlayer from 'react-player';
import { next, useCurrentLessonAndModule } from '../store/slices/player';
import { useAppDispatch, useAppSelector } from '../store';
import { Loader } from 'lucide-react';

export function Video() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLessonAndModule();

  const isLoading = useAppSelector((state) => {
    return state.player.isLoadingCourse;
  });

  function handleNextVideo() {
    dispatch(next());
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 to-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          playing
          onEnded={handleNextVideo}
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
