import Footer from "./Footer";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="mx-auto max-w-lg bg-white">
      {children}
      <Footer />
    </div>
  );
}
