"use client";

import useWindowSize from "@/hooks/useWindowSize";
import {
  getCurrentPushSubscription,
  sendPushSubscriptionToServer,
} from "@/notifications/pushService";
import { registerServiceWorker } from "@/utils/serviceWorker";
import { mdBreakpoint } from "@/utils/tailwind";
import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Chat, LoadingIndicator, Streami18n } from "stream-chat-react";
import { useTheme } from "../ThemeProvider";
import ChatChannel from "./ChatChannel";
import ChatSidebar from "./ChatSidebar";
import PushMessageListener from "./PushMessageListener";
import useInitializeChatClient from "./useInitializeChatClient";

interface ChatPageProps {
  searchParams: { channelId?: string };
}

const i18Instance = new Streami18n({ language: "en" });

export default function ChatPage({
  searchParams: { channelId },
}: ChatPageProps) {
  const chatClient = useInitializeChatClient();
  const { user } = useUser();
  const { theme } = useTheme();

  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);

  const windowSize = useWindowSize();
  const isLargeScreen = windowSize.width >= mdBreakpoint;

  useEffect(() => {
    if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false);
  }, [windowSize.width]);

  useEffect(() => {
    async function setUpServiceWorker() {
      try {
        await registerServiceWorker();
      } catch (error) {
        console.error(error);
      }
    }
    setUpServiceWorker();
  }, []);

  useEffect(() => {
    async function syncPushSubscription() {
      try {
        const subscription = await getCurrentPushSubscription();
        if (subscription) {
          await sendPushSubscriptionToServer(subscription);
        }
      } catch (error) {
        console.error(error);
      }
    }
    syncPushSubscription();
  }, []);

  useEffect(() => {
    if (channelId) {
      history.replaceState(null, "", "/chat");
    }
  }, [channelId]);

  const handleSidebarOnClose = useCallback(() => {
    setChatSidebarOpen(false);
  }, []);

  if (!chatClient || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <LoadingIndicator size={40} />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 text-black dark:bg-black dark:text-white xl:px-20 xl:py-8">
      <div className="m-auto flex h-full min-w-[350px] max-w-[1600px] flex-col shadow-sm">
        <Chat
          client={chatClient}
          i18nInstance={i18Instance}
          theme={
            theme === "dark" ? "str-chat__theme-dark" : "str-chat__theme-light"
          }
        >
          <div className="flex justify-center border-b border-b-[#DBDDE1] p-3 md:hidden">
            <button onClick={() => setChatSidebarOpen(!chatSidebarOpen)}>
              {!chatSidebarOpen ? (
                <span className="flex items-center gap-1">
                  <Menu /> Menu
                </span>
              ) : (
                <X />
              )}
            </button>
          </div>
          <div className="flex h-full flex-row overflow-y-auto">
            <ChatSidebar
              user={user}
              show={isLargeScreen || chatSidebarOpen}
              onClose={handleSidebarOnClose}
              customActiveChannel={channelId}
            />
            <ChatChannel
              show={isLargeScreen || !chatSidebarOpen}
              hideChannelOnThread={!isLargeScreen}
            />
          </div>
          <PushMessageListener />
        </Chat>
      </div>
    </div>
  );
}
