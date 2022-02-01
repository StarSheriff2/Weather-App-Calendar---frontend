import classesReducer, { fetchClassesData, addClass, removeClass } from '../../pages/classesPage/classesPageSlice';

const initialState = {
  classes: [],
  status: 'idle',
  error: null,
};

describe('classesReducer', () => {
  test('should return the initial state', () => {
    expect(classesReducer(undefined, {})).toEqual(initialState);
  });

  describe('fetchClassesData action', () => {
    test('should handle payload from successful request', () => {
      const payload = [
        {
          id: 19,
          title: 'English Composition',
          description: 'Learn how to draft professional essays',
          instructor: 'Jeremy Campbell',
          duration: 4,
          created_at: '2021-11-11T04:20:38.165Z',
          updated_at: '2021-11-11T04:20:38.181Z',
          course_image_url: './images/fakeExpertPic1.jpeg',
        },
        {
          id: 21,
          title: 'Singing',
          description: 'Learn to sing',
          instructor: 'Jackie',
          duration: 5,
          created_at: '2021-11-11T14:20:44.084Z',
          updated_at: '2021-11-11T14:20:44.097Z',
          course_image_url: './images/fakeExpertPic2.jpeg',
        },
      ];

      expect(classesReducer(initialState, fetchClassesData.fulfilled(payload))).toEqual(
        {
          classes: payload,
          status: 'fulfilled',
          error: null,
        },
      );
    });
  });

  describe('addClass action', () => {
    const previousState = {
      classes: [
        {
          id: 19,
          title: 'English Composition',
          description: 'Learn how to draft professional essays',
          instructor: 'Jeremy Campbell',
          duration: 4,
          created_at: '2021-11-11T04:20:38.165Z',
          updated_at: '2021-11-11T04:20:38.181Z',
          course_image_url: './images/fakeExpertPic1.jpeg',
        },
        {
          id: 21,
          title: 'Singing',
          description: 'Learn to sing',
          instructor: 'Jackie',
          duration: 5,
          created_at: '2021-11-11T14:20:44.084Z',
          updated_at: '2021-11-11T14:20:44.097Z',
          course_image_url: './images/fakeExpertPic2.jpeg',
        },
      ],
      status: 'fulfilled',
      error: null,
    };

    test('should handle payload from successful request', () => {
      const payload = {
        message: 'Course successfully created',
        status: 'created',
        course: {
          id: 22,
          title: 'Landscaping',
          description: 'Learn about the latest techniques and trends in this ever evolving field.',
          instructor: 'Andrés Segovia',
          duration: 5,
          created_at: new Date(Date.now()).toISOString().substr(0, 10),
          updated_at: new Date(Date.now()).toISOString().substr(0, 10),
          course_image_url: 'https://res.cloudinary.com/starsheriff/image/upload/fake_image.jpeg',
        },
      };

      expect(classesReducer(previousState, addClass.fulfilled(payload))).toEqual(
        {
          classes: [...previousState.classes, payload.course],
          status: 'fulfilled',
          error: null,
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Unable to create course',
        status: 400,
      };

      expect(classesReducer(previousState, addClass.fulfilled(payload))).toEqual(
        {
          classes: previousState.classes,
          status: 'fulfilled',
          error: payload.message,
        },
      );
    });
  });

  describe('removeClass action', () => {
    const previousState = {
      classes: [
        {
          id: 19,
          title: 'English Composition',
          description: 'Learn how to draft professional essays',
          instructor: 'Jeremy Campbell',
          duration: 4,
          created_at: '2021-11-11T04:20:38.165Z',
          updated_at: '2021-11-11T04:20:38.181Z',
          course_image_url: './images/fakeExpertPic1.jpeg',
        },
        {
          id: 21,
          title: 'Singing',
          description: 'Learn to sing',
          instructor: 'Jackie',
          duration: 5,
          created_at: '2021-11-11T14:20:44.084Z',
          updated_at: '2021-11-11T14:20:44.097Z',
          course_image_url: './images/fakeExpertPic2.jpeg',
        },
      ],
      status: 'fulfilled',
      error: null,
    };

    test('should handle payload from successful request', () => {
      const deletedClass = previousState.classes.filter((c) => c.id === 21)[0];

      const payload = {
        course: deletedClass,
        message: 'Course successfully deleted',
        status: 200,
      };

      expect(classesReducer(previousState, removeClass.fulfilled(payload))).toEqual(
        {
          classes: previousState.classes.filter((c) => c.id !== payload.course.id),
          status: 'fulfilled',
          error: null,
        },
      );
    });

    test('should handle payload from unsuccessful request', () => {
      const payload = {
        message: 'Unable to delete course',
        status: 400,
      };

      expect(classesReducer(previousState, removeClass.fulfilled(payload))).toEqual(
        {
          classes: previousState.classes,
          status: 'fulfilled',
          error: payload.message,
        },
      );
    });

    test('should handle a bad request response', () => {
      const payload = {
        message: 'Couldn\'t find Course with \'id\'=11',
      };

      expect(classesReducer(previousState, removeClass.rejected(payload))).toEqual(
        {
          classes: previousState.classes,
          status: 'rejected',
          error: 'Error connecting with server. Please try again.',
        },
      );
    });
  });
});
