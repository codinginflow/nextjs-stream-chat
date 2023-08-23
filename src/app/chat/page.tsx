"use client";

import { StreamChat } from "stream-chat";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

const userId = "user_2UNK1RqEauSFNapxTnucelpUm9w";

const chatClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_KEY!);

chatClient.connectUser(
  {
    id: userId,
    name: "Florian Walther",
  },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidXNlcl8yVU5LMVJxRWF1U0ZOYXB4VG51Y2VscFVtOXcifQ.rUXcr0by6fXCDSGtYVGf7G_UoRy6riGO5pF3PuOPRFo"
);

const channel = chatClient.channel("messaging", "channel_1", {
  name: "Channel #1",
  members: [userId],
});

export default function ChatPage() {
  return (
    <div>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}
