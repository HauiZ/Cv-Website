const GoogleMap = ({ placeName }) => {
  const encodedPlace = encodeURIComponent(placeName); // Dia+Diem

  return (
    <iframe
      src={`https://www.google.com/maps?q=${encodedPlace}&output=embed`}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};
export default GoogleMap;