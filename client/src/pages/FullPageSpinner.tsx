const FullPageSpinner = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          fontSize: "20px", // Example styling
        }}
      >
        Loading...
        {/* You would put a proper spinner/animation here */}
      </div>
    </>
  );
};

export default FullPageSpinner;
