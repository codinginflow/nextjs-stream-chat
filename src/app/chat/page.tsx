"use client";

import { useUser } from "@clerk/nextjs";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import useInitializeChatClient from "./useInitializeChatClient";

export default function ChatPage() {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Chat client={chatClient}>
        <div className="flex h-full flex-row">
          <div className="w-full max-w-[360px]">
            <ChannelList
              filters={{
                type: "messaging",
                members: { $in: [user.id] },
              }}
              sort={{ last_message_at: -1 }}
              options={{ state: true, presence: true, limit: 10 }}
            />
          </div>
          <div className="h-full w-full">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
}
