import { ChatWindow } from "~/components/ChatWindow";
import { Layout } from "~/components/Layout";

export default function ChatPage() {
  return (
    <Layout>
      <ChatWindow isOnChatRoute={true} />
    </Layout>
  );
}
