import React, { createContext, useRef, useContext } from 'react';
import PropTypes from 'prop-types';

const MapContext = createContext(null);

export const MapProvider = ({ children }) => {
  const mapRef = useRef(null);
  return <MapContext.Provider value={mapRef}>{children}</MapContext.Provider>;
};

MapProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useMap = () => {
  return useContext(MapContext);
};
