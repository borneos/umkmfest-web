import MenuBottom from "./MenuBottom";

export default function Layout(props) {
  const { children } = props;
  return (
    <div className="mx-auto max-w-md bg-white min-h-screen pb-20">
      {children}
      <MenuBottom />
    </div>
  );
}
