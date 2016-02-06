import Action from '../../lib/action';

export default class CourseIndex extends Action {
  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return [
      {
        type: 'courses',
        id: 1,
        attributes: {
          name: 'Learn Ember',
        },
      },
    ];
  }
}
