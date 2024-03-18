// LoquorElement Component


const LoquorElement = ({ number, title, duration, imageUrl }) => {
  const handleMouseEnter = () => {
    document.getElementById(`number-${number}`).style.display = "none";
    document.getElementById(`play-button-${number}`).style.display = "block";
  };

  const handleMouseLeave = () => {
    document.getElementById(`number-${number}`).style.display = "block";
    document.getElementById(`play-button-${number}`).style.display = "none";
  };

  return (
    <div
      className="flex items-center justify-between bg-[#181818] p-4 transition duration-300 ease-in-out hover:bg-[#282828] cursor-pointer relative w-full rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{height:"60px"}}
    >
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center justify-center text-white text-xl">
          <div className="w-10 flex justify-center items-center ">
            <h5 id={`number-${number}`} className="text-white">
              {number}
            </h5>
            <img
              id={`play-button-${number}`}
              className="hidden h-6 w-6"
              src="/images/loquorImages/play2.png"
              alt="Play"
            />
          </div>
        </div>
        <img src={imageUrl} alt="Album" className="h-8 w-8 rounded-full" />
        <div className="font-semibold text-white">{title}</div>
      </div>
      <div>
        <span className="text-gray-400 text-xs">{duration}</span>
      </div>
    </div>
  );
};

export default LoquorElement;
