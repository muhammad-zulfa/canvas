export const Splash: React.FC<{loading: boolean}> = ({loading}) => {
  return (
    <>
      {loading &&
        <div style={{
          position: 'absolute',
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <div>
            Loading 
          </div>
        </div>
      }
    </>
    
  )
}