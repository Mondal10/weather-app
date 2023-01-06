import { useEffect, useReducer } from 'react';

interface IGeolocationState {
  isLoading: boolean;
  position: null | GeolocationPosition;
  error: null | any;
}

interface IGeolocationCoords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface IGeolocationAction {
  type: 'error' | 'success';
  error?: GeolocationPositionError | Error;
  position?: GeolocationPosition;
}

function geoPositionReducer(
  state: IGeolocationState,
  action: IGeolocationAction
): IGeolocationState {
  switch (action.type) {
    case 'error': {
      return {
        ...state,
        isLoading: false,
        error: action.error || null,
      };
    }
    case 'success': {
      return {
        ...state,
        isLoading: false,
        position: action.position || null,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export const useGeolocation = () => {
  const [state, dispatch] = useReducer(geoPositionReducer, {
    isLoading: true,
    position: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch({
        type: 'error',
        error: new Error('Geolocation is not supported by this browser.'),
      });
      throw new Error('Geolocation is not supported by this browser.');
    }

    const geoWatchID = navigator.geolocation.watchPosition(
      (position) => dispatch({ type: 'success', position }),
      (error) => dispatch({ type: 'error', error })
    );

    return () => {
      navigator.geolocation.clearWatch(geoWatchID);
    };
  }, []);

  return state;
};
