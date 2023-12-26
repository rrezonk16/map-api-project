import React from 'react';

const MyMap = ({ lat, long }) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${long - 0.1}%2C${lat - 0.1}%2C${long + 0.1}%2C${lat + 0.1}&amp;layer=mapnik&amp;marker=21%2C$40`;

  return (
    <iframe
      width="100%"
      height="340"
      src={mapUrl}
      title="Dynamic Map"
    />
  );
};

export default MyMap;
