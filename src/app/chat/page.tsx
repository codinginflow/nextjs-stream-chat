import { UserButton } from "@clerk/nextjs";

export default function ChatPage() {
  return (
    <div>
      This is the chat
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
