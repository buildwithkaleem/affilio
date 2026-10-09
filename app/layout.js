import AuthInitializer from "@/components/AuthInitializer";
import "./globals.css";
import ReduxProvider from "@/redux/Provider";
import NotificationInitializer from "@/components/NotificationInitializer";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata = {
  title: "Affilio",
  description: "Affiliate marketing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthInitializer>
            <NotificationInitializer>
              {children}
            </NotificationInitializer>
          </AuthInitializer>
        </ReduxProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}