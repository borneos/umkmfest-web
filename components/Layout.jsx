import MenuBottom from "./MenuBottom";

export default function Layout(props) {
  const { children, hideBottomMenu } = props;
  return (
    <div className={`mx-auto max-w-md bg-white min-h-screen ${!hideBottomMenu && `pb-20`}`}>
      {children}
      {
        !hideBottomMenu ? <MenuBottom /> : null
      }
    </div>
  );
}
