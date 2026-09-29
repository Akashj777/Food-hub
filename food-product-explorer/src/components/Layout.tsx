import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/products" className="logo">
            Foodhub
          </Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
