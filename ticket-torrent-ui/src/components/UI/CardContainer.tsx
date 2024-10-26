const CardContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="outline outline-1 relative outline-blue-500 p-4 rounded-md h-[150px] md:h-[250px] w-full overflow-auto">{children}</div>;
};

export default CardContainer;
