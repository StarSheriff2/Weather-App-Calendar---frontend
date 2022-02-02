/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderWithRedux from '../../tests/test-utils';
import GoogleMapsApiAutocomplete from '../../components/GoogleMapsApiAutocomplete';

afterEach(cleanup);

describe('GoogleMapsApiAutocomplete', () => {
  // ⬇️ window.google object code snippet copied from this thread:
  // https://github.com/hibiken/react-places-autocomplete/issues/189#issuecomment-418555543

  window.google = {
    maps: {
      Marker: class {},
      Map: class {
        setTilt() {}

        fitBounds() {}
      },
      LatLngBounds: class {},
      places: {
        Autocomplete: class {},
        AutocompleteService: class {},
        PlacesServiceStatus: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
        PlacesAutocomplete: {
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
        },
      },

      MarkerClusterer: class {},
      Geocoder: class {},
    },
  };

  test('Renders the Component', () => {
    const field = {
      name: 'city',
      value: '',
    };

    const placeholder = 'Search location';

    const form = {
      values: {
        description: '',
        date: '',
        time: `${new Date().toString().slice(16, 21)}`,
        city: '',
        locationCoordinates: '',
      },
      setValues: () => true,
    };

    const googleMapsApiAutocomplete = renderWithRedux(
      <Router>
        <GoogleMapsApiAutocomplete
          field={field}
          placeholder={placeholder}
          form={form}
        />
      </Router>,
    ).toJSON();

    expect(googleMapsApiAutocomplete).toMatchSnapshot();
  });
});
