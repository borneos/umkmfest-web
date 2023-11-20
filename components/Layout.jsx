export default function Layout(props) {
  const { children } = props;
  return (
    <div className="mx-auto max-w-lg bg-red-500">{children}</div>
  )
}