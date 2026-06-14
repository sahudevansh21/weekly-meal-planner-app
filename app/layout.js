import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Weekly Meal Planner',
  description: 'Plan your meals, generate shopping lists, and save your favorite plans.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  );
}
