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
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { Card, Input, message, Button, Space } from 'antd';
import { selectWeatherContainer, selectCityData, selectCityError, selectCityName } from './selectors';
import { weatherContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const DetailsCard = styled(Card)`
  margin: 20px 20px;
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
const CustomDiv = styled.div`
  width: 100%;
  font-weight: bolder;
  font-size: 20px;
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
const CustomSpace = styled(Space)`
  margin: ${props => props.margin}px;
`;
export function WeatherContainer({ dispatchCityWeather, cityData = {}, cityError = null, cityName, intl }) {
  useInjectSaga({ key: 'weatherContainer', saga });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(cityData, 'name', cityError);
    if (loading && loaded) {
      setLoading(false);
    }
  }, [cityData]);

  useEffect(() => {
    if (cityName && !cityData.main) {
      dispatchCityWeather(cityName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = wName => {
    if (!isEmpty(wName)) {
      dispatchCityWeather(wName);
      setLoading(true);
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 400);

  const renderCityList = () => {
    const name = get(cityData, 'name', null);
    return (
      name && (
        <DetailsCard>
          <CustomDiv>
            <T id="city_name" values={{ name: cityData.name }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_timezone" values={{ timezone: cityData.timezone }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_temperature" values={{ temperature: cityData.main.temp }} />
          </CustomDiv>
          <CustomDiv>
            <T id="city_description" values={{ description: cityData.weather[0].description }} />
          </CustomDiv>
        </DetailsCard>
      )
    );
  };
  const renderErrorState = () => {
    const error = () => {
      message.error('This is wrong City Name, Please Enter Correct City Name');
    };
    const name = get(cityData, 'name', null);
    if (cityError) {
      return (
        !loading &&
        !name && (
          <CustomSpace>
            <Button onClick={error}>Error</Button>
          </CustomSpace>
        )
      );
    }
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
      <CustomCard title="Weather Details">
        <T marginBottom={10} id="get_weather_details" />
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
  dispatchCityWeather: PropTypes.func,
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
    dispatchCityWeather: cityName => dispatch(requestGetCityWeather(cityName))
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
