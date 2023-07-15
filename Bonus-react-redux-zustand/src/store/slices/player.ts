import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useAppSelector } from '..';
import { api } from '../../lib/api';

interface Course {
  id: number;
  modules: Array<{
    id: number;
    title: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
    }>;
  }>;
}

export interface PlayerState {
  course: Course | null;
  currentModuleIndex: number;
  currentLessonIndex: number;
  isLoadingCourse: boolean;
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoadingCourse: true,
};

export const loadCourse = createAsyncThunk('player/load', async () => {
  const response = await api.get('/courses/1');

  return response.data;
});

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Way not async using useEffect in the Player.tsx file
    // start: (state, action: PayloadAction<Course>) => {
    //   state.course = action.payload;
    // },
    play: (state, action: PayloadAction<[number, number]>) => {
      state.currentModuleIndex = action.payload[0];
      state.currentLessonIndex = action.payload[1];
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1;
      const nextLesson =
        state.course?.modules[state.currentModuleIndex].lessons[
          nextLessonIndex
        ];
      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex;
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1;
        const nextModule = state.course?.modules[nextModuleIndex];

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex;
          state.currentLessonIndex = 0;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCourse.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoadingCourse = false;
    });
    builder.addCase(loadCourse.pending, (state) => {
      state.isLoadingCourse = true;
    });
  },
});

export const player = playerSlice.reducer;
export const { play, next } = playerSlice.actions;

export const useCurrentLessonAndModule = () => {
  return useAppSelector((state) => {
    const { currentModuleIndex, currentLessonIndex } = state.player;
    const currentModule = state.player.course?.modules[currentModuleIndex];
    const currentLesson = currentModule?.lessons[currentLessonIndex];

    return { currentModule, currentLesson };
  });
};
