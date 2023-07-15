import { useAppSelector } from '../store';
import { useCurrentLessonAndModule } from '../store/slices/player';

export function Header() {
  const { currentModule, currentLesson } = useCurrentLessonAndModule();

  const isLoading = useAppSelector((state) => {
    return state.player.isLoadingCourse;
  });

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Carregando...</h1>;
  }

  return (
    <div className="flex flex-col gap-1 ">
      <h1 className="text-2xl font-bold">{currentModule?.title}</h1>
      <span className="text-sm text-zinc-400">
        Módulo "{currentLesson?.title}"
      </span>
    </div>
  );
}
