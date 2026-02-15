const Button = ({ text, onClick, variant }: { text: string, onClick: () => void, variant: 'primary' | 'secondary' | 'link' }) => {
    const variantClasses = {
        primary: 'bg-primary text-white',
        secondary: 'bg-white text-black',
        link: 'text-black hover:text-gray-700',
    };
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-md ${variantClasses[variant]}`}>
      {text}
    </button>
  );
};

export default Button;
