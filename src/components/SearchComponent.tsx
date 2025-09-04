import SearchButton from "./SearchButton";
interface FilhoProps {
  sendTargetValue: (valor: string) => void;
  sendEventClick: () => void;

}

const SearchComponent = ({ sendTargetValue, sendEventClick }: FilhoProps) => {
  return (
    <form className="flex justify-center gap-4 my-8 px-4">
      <input
        type="text"
        className="max-w-[500px] h-8 border focus:outline-none w-full focus:border-purple-400 border-gray-600 p-4 rounded-2xl"
        onChange={(e) => sendTargetValue(e.target.value)}
        autoFocus
      />
      <SearchButton
  
        bgColor="#6700D4"
        eventClick={sendEventClick}
      />
    </form>
  );
};

export default SearchComponent;
