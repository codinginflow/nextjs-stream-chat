import { PushSubscription } from "web-push";

declare global {
  interface UserPrivateMetadata {
    subscriptions: PushSubscription[] | undefined;
  }
}
