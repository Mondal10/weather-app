type Props = {
  text: string;
};

function Header({ text }: Props) {
  return <div className="flex justify-center">{text}</div>;
}

export default Header;
