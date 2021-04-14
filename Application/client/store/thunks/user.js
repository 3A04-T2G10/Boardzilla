import { snakeToCamelCase } from "_utils/snakeToCC";
import { store as RNC } from "react-notifications-component";

import { getUser, putUser, putUserPassword } from "_api/user";
import { putCalendarLayout } from "_api/events";
import { updateUser } from "_actions/user";

import { dispatchError } from "_utils/api";

export const attemptGetUser = () => (dispatch) =>
  getUser()
    .then((data) => {
      dispatch(updateUser(snakeToCamelCase(data.user)));
      return data.user;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateUser = (updatedUser) => (dispatch) =>
  putUser(updatedUser)
    .then((data) => {
      dispatch(updateUser(snakeToCamelCase(data.user)));

      RNC.addNotification({
        title: "Success!",
        message: data.message,
        type: "success",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
          duration: 5000,
        },
      });

      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdatePassword = (passwordInfo) => (dispatch) =>
  putUserPassword(passwordInfo)
    .then((data) => {
      RNC.addNotification({
        title: "Success!",
        message: data.message,
        type: "success",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        dismiss: {
          duration: 5000,
        },
      });

      return data;
    })
    .catch(dispatchError(dispatch));

export const attemptUpdateCalendarLayout = (id, x, y, width, height) => (
  dispatch
) =>
  putCalendarLayout({ id, x, y, width, height })
    .then((data) => {
      dispatch(updateUser(snakeToCamelCase(data.user)));
      return data;
    })
    .catch(dispatchError(dispatch));
