/**
 *
 * WeatherContainer
 *
 */

import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import Clickable from '@components/Clickable';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import { selectWeatherContainer, selectCityData, selectCityError, selectCityName } from './selectors';
import { weatherContainerCreators } from './reducer';
import saga from './saga';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function WeatherContainer({ dispatchCityWheather, cityData = {}, cityError = null, cityName, intl }) {
  useInjectSaga({ key: 'weatherContainer', saga });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((loading && cityData) || cityError) {
      setLoading(false);
    }
  }, [cityData]);

  useEffect(() => {
    if (cityName && !cityData) {
      dispatchCityWheather(cityName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = wName => {
    if (!isEmpty(wName)) {
      dispatchCityWheather(wName);
      setLoading(true);
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 400);

  const renderCityList = () => {
    return (
      (cityData || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {cityName && <div></div>}

            <CustomCard>
              <h2>City Name - {cityData.name}</h2>
              <h2>City Timezone - {cityData.timezone}</h2>
              <h2>City Temperature - {cityData.main.temp}</h2>

              {/* <h2 id="rpository_name" values={{ name: cityData.name }} />
              <h2 id="repository_full_name" values={{ fullName: cityData.temp_min }} /> */}
            </CustomCard>
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let citywError;
    if (cityError) {
      citywError = cityError;
    }
    return (
      !cityData &&
      citywError && (
        // eslint-disable-next-line react/prop-types
        <h2>Error</h2>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title="hey">
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={cityName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderCityList()}
      {renderErrorState()}
    </Container>
  );
}

WeatherContainer.propTypes = {
  dispatchCityWheather: PropTypes.func,
  intl: PropTypes.object,
  cityData: PropTypes.object,
  cityError: PropTypes.object,
  cityName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

const mapStateToProps = createStructuredSelector({
  weatherContainer: selectWeatherContainer(),
  cityData: selectCityData(),
  cityError: selectCityError(),
  cityName: selectCityName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetCityWeather } = weatherContainerCreators;
  return {
    dispatchCityWheather: cityName => dispatch(requestGetCityWeather(cityName))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(WeatherContainer);

export const WeatherContainerTest = compose(injectIntl)(WeatherContainer);

//   return (
//     <div>
//       <Helmet>
//         <title>WeatherContainer</title>
//         <meta name="description" content="Description of WeatherContainer" />
//       </Helmet>
//     <T id={'WeatherContainer'} />
//     </div>
//   )
// }

// WeatherContainer.propTypes = {
// }

// const mapStateToProps = createStructuredSelector({
//   weatherContainer: makeSelectWeatherContainer(),
// })

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   }
// }

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

// export default compose(
//   withConnect,
//   memo,
// )(WeatherContainer);

// export const WeatherContainerTest = compose(injectIntl)(WeatherContainer);

// < --- / /-- >

// /**
//  *
//  * WeatherContainer
//  *
//  */

// import React, { memo } from 'react';
// // import PropTypes from 'prop-types'
// import { connect } from 'react-redux';
// import { injectIntl } from 'react-intl';
// import { Helmet } from 'react-helmet';
// import { FormattedMessage as T } from 'react-intl';
// import { createStructuredSelector } from 'reselect';
// import { compose } from 'redux';
// import { useInjectSaga } from '@utils/injectSaga';
// import makeSelectWeatherContainer, { selectCityData } from './selectors';
// import saga from './saga';
// import { weatherContainerCreators } from './reducer';

// export function WeatherContainer(

// ) {
//   useInjectSaga({ key: 'weatherContainer', saga });

//   return (
//     <div>
//       <Helmet>
//         <title>WeatherContainer</title>
//         <meta name="description" content="Description of WeatherContainer" />
//       </Helmet>
//       <T id={'WeatherContainer'} />
//     </div>
//   );
// }

// WeatherContainer.propTypes = {};

// const mapStateToProps = createStructuredSelector({
//   weatherContainer: selectWeatherContainer(),
//   cityName
//   cityData: selectCityData();

// });

// function mapDispatchToProps(dispatch) {
//   const { requestGetCityWeather } = weatherContainerCreators;
//   return {
//     dispatchCityWeather: cityWeather => dispatch(requestGetCityWeather(cityName))
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps
// );

// export default compose(
//   withConnect,
//   memo
// )(WeatherContainer);

// export const WeatherContainerTest = compose(injectIntl)(WeatherContainer);
