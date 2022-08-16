/**
 *
 * Form Container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectSaga } from 'redux-injectors';
import { selectUserdata } from './selectors';
import saga from './saga';
import { formCreators } from './reducer';

export function Form({ dispatchAddUserData, somePayLoad }) {
  const [inputField, setInputField] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const onChangeName = (e) => {
    // setInputField({name:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      name: val
    }));
    console.log(inputField);
  };
  const onChangeMobile = (e) => {
    // setInputField({mobile:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      mobile: val
    }));
    console.log(inputField);
  };
  const onChangeEmail = (e) => {
    // setInputField({email:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      email: val
    }));
    console.log(inputField);
  };

  const style = {
    margin : '0px'
  }
  const onSubmit = () => {
    dispatchAddUserData(inputField);
    // alert(JSON.stringify(inputField));
  };

  const renderUsers = ()=>{
    return (
      somePayLoad.map((user)=>{
        return (
          <div>
           <h1 style={style}>{user.name}</h1>
           <p>{user.mobile},{user.email}</p>
         </div>
        )
      })
    )
  }

  return (
    <div>
      {/* <T id={'Form'} /> */}
      <form>
        <label>
          Name
          <input type="text" name="name" onChange={onChangeName} />
        </label>
        <label>
          Mobile
          <input type="number" name="mobile" onChange={onChangeMobile} />
        </label>
        <label>
          Email
          <input type="email" name="email " onChange={onChangeEmail} />
        </label>
        <input type="submit" name="Submit" onClick={onSubmit} />
      </form>
      <hr/>
      <h1>Registered Users</h1>
      {renderUsers()}
    </div>
  );
}

Form.propTypes = {
  somePayLoad: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectUserdata()
});

function mapDispatchToProps(dispatch) {
  console.log(formCreators);
  const { addUserData, getUserData } = formCreators;
  return {
    dispatchAddUserData: (userData) => dispatch(addUserData(userData))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'form', saga }))(Form);

export const FormTest = compose(injectIntl)(Form);
