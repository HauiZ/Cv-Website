const Logo = ({ size = 'md' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'h-6';
      case 'lg':
        return 'h-10';
      default:
        return 'h-8';
    }
  };

  return (
    <div className="flex items-center">
      <div className="relative">
        <div className={`${getSizeClass()} flex items-center`}>
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className={`${getSizeClass()}`}
          >
            <circle cx="50" cy="50" r="40" fill="#00875a" />
            <path
              d="M30 40 L50 60 L70 40"
              stroke="white"
              strokeWidth="6"
              fill="none"
            />
            <path
              d="M30 60 L50 80 L70 60"
              stroke="white"
              strokeWidth="6"
              fill="none"
            />
          </svg>
          <span className="ml-2 font-bold text-[#00875a]">CV Website</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;
