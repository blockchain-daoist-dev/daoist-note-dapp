import BeatLoader from "react-spinners/BeatLoader";

const Loading = ({ loading, children }) => {
  if (loading) return <div 
  style={{ 
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    fontSize: '1.75rem',
     }}
  ><p>Loading...</p>
  <BeatLoader 
  color={"purple"}
  loading={true}
  size={35}
  margin={4}
  aria-label="Loading Spinner"
  data-testid="loader"
  /></div>

  return <>{children}</>
}

export default Loading
