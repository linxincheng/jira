import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./auth-context";

export const AppPorviders = ({children}: {children: ReactNode}) => {
  return <AuthProvider>
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  </AuthProvider>
}