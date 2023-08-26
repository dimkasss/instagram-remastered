interface Section {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const CustomSection: React.FC<Section> = ({children, className}) => {
  return ( 
    <section className={"p-4 flex justify-center items-center font-bold " + className}>
      {children}
    </section>
   );
}
 
export default CustomSection