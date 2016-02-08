import { jsonApiSupport } from '../../lib/decorators/actions';
import Action from '../../lib/action';
import bcrypt from 'bcrypt';

const userNotFound = Promise.reject({
  status: 404,
  data: {
    message: 'A user with that email and password cannot be found'
  }
});

@jsonApiSupport('users')
export default class CourseIndex extends Action {

  /**
   * Simplified promise aware hook for finding data
   * @return {any} POJO or Promise of data
   */
  data() {
    return this.app.db('users')
      .where({email: this.request.body.email})
      .first(['email', 'id', 'password']).then((user) => {
        if (!user) { return userNotFound; }

        return user;
      });
  }

  after(user) {
    const hash = bcrypt.hashSync('Password@123', 10);
    let updatePassword = false;

    // Convert from Laravel login to Node Login
    if (user.password.includes('$2y$')) {
      user = {
        ...user,
        password: user.password.replace('$2y$', '$2a$'),
      };

      updatePassword = true;
    }

    if (bcrypt.compareSync(this.request.body.password, user.password)) {
      if (updatePassword) {
        this.app.db('users')
          .where({email: this.request.body.email})
          .update({password: user.password.replace('$2y$', '$2a$')})
          .then();
      }

      delete user.password

      return {...user};
    }

    return null;
  }
}
