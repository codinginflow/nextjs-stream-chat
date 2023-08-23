import { env } from "@/env";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export default function useInitializeChatClient() {
  const { user } = useUser();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const client = StreamChat.getInstance(env.NEXT_PUBLIC_STREAM_KEY);

    client
      .connectUser(
        {
          id: user.id,
          name: user.fullName || user.id,
          image: user.imageUrl,
        },
        async () => {
          const response = await fetch("/api/get-token");
          if (!response.ok) {
            throw Error("Failed to get token");
          }
          const body = await response.json();
          return body.token;
        }
      )
      .catch((error) => console.error("Failed to connect user", error))
      .then(() => setChatClient(client));

    return () => {
      setChatClient(null);
      client
        .disconnectUser()
        .catch((error) => console.error("Failed to disconnect user", error))
        .then(() => console.log("Connection closed"));
    };
  }, [user?.id, user?.fullName, user?.imageUrl]);

  return chatClient;
}
