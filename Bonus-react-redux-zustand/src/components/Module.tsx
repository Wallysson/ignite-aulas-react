import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { Lesson } from './Lesson';
import { useStore } from '../zustand-store';

interface ModuleProps {
  moduleIndex: number;
  title: string;
  amountOfLessons: number;
}

export function Module({ moduleIndex, title, amountOfLessons }: ModuleProps) {
  const { currentLessonIndex, currentModuleIndex, play, lessons } = useStore(
    (store) => {
      return {
        lessons: store.course?.modules[moduleIndex].lessons,
        currentLessonIndex: store.currentLessonIndex,
        currentModuleIndex: store.currentModuleIndex,
        play: store.play,
      };
    }
  );

  return (
    <Collapsible.Root className="group w-full" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center  bg-zinc-800 p-4 gap-3">
        <span className="flex h-10 w-10 rounded-full items-center bg-zinc-950 justify-center text-xs">
          {moduleIndex + 1}
        </span>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm ">{title}</strong>
          <span className="text-xs to-zinc-400">{amountOfLessons} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform duration-100" />
      </Collapsible.Trigger>

      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent =
                currentModuleIndex === moduleIndex &&
                currentLessonIndex === lessonIndex;
              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                  isCurrent={isCurrent}
                />
              );
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}
