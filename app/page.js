import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-page-content">
      <div className="glass-card homepage-card">
        <h1 className="gradient-text">Weekly Meal Planner</h1>
        <p className="tagline">Simplify your week, one meal at a time.</p>

        <h2>The Problem:</h2>
        <p>Many individuals struggle with consistent meal planning, leading to repetitive meals, last-minute unhealthy choices, or food waste. The typical complex recipe database is often overkill when you just need a simple, visual tool.</p>

        <h2>Our Solution:</h2>
        <p>This website offers an intuitive, interactive calendar where you can easily input meals for each day of the week. It then automatically compiles a customizable shopping list based on your plan, which can be edited, saved, and printed. All your meal plans and shopping lists are stored securely on your device, client-side.</p>

        <div className="btn-group">
          <Link href="/meal-plan-editor" className="btn">
            Start Planning Now
          </Link>
        </div>
      </div>
    </div>
  );
}
