import { PushSubscription } from "web-push";

declare global {
  interface UserPrivateMetadata {
    subscriptions: (PushSubscription & { sessionId: string })[] | undefined;
  }

  interface UserUnsafeMetadata {
    mutedChannels: string[] | undefined;
  }
}
