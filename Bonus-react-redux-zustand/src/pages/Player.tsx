import { MessageCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Video } from '../components/Video';
import { Module } from '../components/Module';
import { useMediaQuery } from '@react-hook/media-query';
import { useAppDispatch, useAppSelector } from '../store';
import { loadCourse, useCurrentLessonAndModule } from '../store/slices/player';
import { useEffect } from 'react';

export function Player() {
  const dispatch = useAppDispatch();
  const { currentLesson } = useCurrentLessonAndModule();

  const isLoading = useAppSelector((state) => {
    return state.player.isLoadingCourse;
  });

  const modules = useAppSelector((state) => {
    return state.player.course?.modules;
  });

  const isMobile = useMediaQuery('(max-width: 640px)');
  const hideButton = useMediaQuery('(max-width: 300px)');

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  useEffect(() => {
    dispatch(loadCourse());
  }, []);

  // Using pure actions
  // useEffect(() => {
  //   api.get('/courses/1').then((response) => dispatch(start(response.data)));
  // }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <div className="container max-w-6xl mx-auto flex flex-col gap-6 px-4">
        <div className="flex items-center justify-between py-8 ">
          <Header />

          {!hideButton && (
            <button className="rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600 flex items-center justify-center gap-2">
              {isMobile && <MessageCircle className="w-4 h-4" />}
              {!isMobile && (
                <>
                  <MessageCircle className="w-4 h-4" />
                  Deixar Feedback
                </>
              )}
            </button>
          )}
        </div>

        <main className="flex flex-col lg:flex-row lg:relative lg:pr-80 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-md">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="border-t  lg:w-80 border-zinc-800 divide-y-2 divide-zinc-900 bg-zinc-900 lg:absolute lg:top-0 lg:bottom-0 lg:right-0 overflow-y-auto scrollbar scrollbar-thin scrollbar-track-zinc-900 scrollbar-thumb-zinc-800 animate-pulse">
            {modules &&
              modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={index}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                );
              })}
          </aside>
        </main>
      </div>
    </div>
  );
}
