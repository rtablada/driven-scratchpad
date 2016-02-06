import { createAfterAction } from '../../lib/decorators/action-hook-helpers';

import Action from '../../lib/action';

const mutData = createAfterAction(function(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data}), 800);
  });
});

@mutData
export default class CourseIndex extends Action {

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    console.log(this.afterHooks);

    return [
      {
        type: 'courses',
        id: 1,
        attributes: {
          name: this.request.query.name || 'Learn Ember',
        },
      },
    ];
  }
}
