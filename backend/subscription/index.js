import { PubSub } from "apollo-server";

import * as POST_EVENTS from "./post";

export const EVENTS = {
  POST: POST_EVENTS
};

export default new PubSub();
