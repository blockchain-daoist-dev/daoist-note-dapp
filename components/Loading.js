import BeatLoader from "react-spinners/BeatLoader";

const Loading = ({ loading, children }) => {
  if (loading) return <div 
  style={{ 
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
     }}
  ><p>Loading...</p>
  <BeatLoader 
  color={"purple"}
  loading={true}
  size={40}
  margin={5}
  aria-label="Loading Spinner"
  data-testid="loader"
  /></div>

  return <>{children}</>
}

export default Loading
