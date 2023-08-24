import { ComponentPropsWithoutRef } from "react";
import { LoadingIndicator } from "stream-chat-react";
import Button from "./Button";

interface LoadingButtonProps extends ComponentPropsWithoutRef<"button"> {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  ...props
}: LoadingButtonProps) {
  return (
    <Button {...props} disabled={loading}>
      {loading ? <LoadingIndicator /> : props.children}
    </Button>
  );
}
