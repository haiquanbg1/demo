import styles from './Register.module.scss';
import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import fetchAPI from '../../fetchAPI';

import Button from '~/components/Button';
import requestApi from '~/fetch';

const cx = classNames.bind(styles)


function Register() {
    // const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
    // const [day, setDay] = useState('')

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("0");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");


    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    // const [birth, setBirth] = useState("");
    // const [address, addresschange] = useState("");



    const { register, handleSubmit, formState: { errors } } = useForm();
    const usenavigate = useNavigate();

    //Register
    const onSubmit = (e) => {
        let birthday = `${year}/${month}/${day}`;
        e.preventDefault();
        let regobj = { firstname: firstName, lastname: lastName, gender, email, password, phone, birthday: '2004-02-11', city_id: 1, };

        requestApi('user/register', 'post', regobj)
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err))
        // axios
        //     .post("http://localhost:8080/api/ver1/user/register", regobj)
        //     .then((res) => {
        //         console.log(res)
        //     })
        //     .catch(err => console.log(err))
        // try {
        //     const data = await fetch("http://localhost:8080/api/ver1/user/register", {
        //         method: "POST",
        //         // headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(regobj)
        //     }).then((res) => {
        //         console.log('Registered successfully.')
        //     }).catch((err) => {
        //         console.log('Failed :' + err.message);
        //     });
        // }
        // catch (e) {
        //     console.log(e)
        // }

    }


    //Login

    const loginHandle = (e) => {
        e.preventDefault();
        let inputobj = {
            "email": loginEmail,
            "password": loginPassword
        };

        requestApi('user/login', 'post', inputobj)
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refresh_token)
                usenavigate('/')
            })
            .catch(err => console.log(err))
        // axios
        //     .post("http://localhost:8080/api/ver1/user/login", inputobj)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err))
    }


    return (<div className={cx('account-container')}>
        <div className={cx('custom-login')}>
            <div className={cx('login-form', 'large-4', 'col')}>
                <div className={cx('account-login-inner')}>
                    <h2>Đăng nhập tài khoản</h2>
                    <form onSubmit={loginHandle} method='post' className={cx('form', 'login-form')}>
                        <div className={cx('form-row')}>
                            <label>
                                Email
                                <span> *</span>
                            </label>
                            <input value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder='Tài khoản hoặc địa chỉ email' type='text' name='email-regis' id='email-regis'></input>
                        </div>
                        <div className={cx('form-row')}>
                            <label>
                                Mật khẩu
                                <span> *</span>
                            </label>
                            <div>
                                <input value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder='Mật khẩu' type='password' name='password-regis' id='password-regis'></input>
                            </div>
                        </div>

                        <div type='submit'><Button primary stretch className={'login-btn'}>ĐĂNG NHẬP</Button></div>
                    </form>
                </div>
            </div>
            <div className={cx('register-form', 'large-7', 'col')}>
                <div onSubmit={onSubmit} className={cx('account-register-inner')}>
                    <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
                    <form method='post' className={cx('form', 'register-form')}>

                        <div className={cx('name')}>
                            {/*Họ */}
                            <div className={cx('form-row')}>
                                <label>
                                    Họ
                                    <span> *</span>
                                </label>
                                <input value={firstName} onChange={e => setFirstName(e.target.value)} type='text' name='last_name' id='last_name'></input>
                            </div>

                            {/*Tên và tên đêm */}
                            <div className={cx('form-row')}>
                                <label>
                                    Tên đệm và tên
                                    <span> *</span>
                                </label>
                                <input value={lastName} onChange={e => setLastName(e.target.value)} type='text' name='first_name' id='first_name'></input>
                            </div>
                        </div>

                        <div className={cx('gender-mail')}>
                            {/*Giới tính */}
                            <div className={cx('form-radio')}>
                                <label>
                                    Giới tính
                                    <span> *</span>
                                </label>
                                <div className={cx('radio-list')}>
                                    <label className={cx('radio-item')}>
                                        <span>Nam</span>
                                        <input checked={gender === '1'} onChange={e => setGender(e.target.value)} type="radio" name='title' value='1' />
                                        <span className={cx('checkmark')}></span>
                                    </label>

                                    <label className={cx('radio-item')}>
                                        <span>Nữ</span>
                                        <input checked={gender === '0'} onChange={e => setGender(e.target.value)} type="radio" name='title' value='0' />
                                        <span className={cx('checkmark')}></span>
                                    </label>

                                    <label className={cx('radio-item')}>
                                        <span>Khác</span>
                                        <input type="radio" name='title' value='2' />
                                        <span className={cx('checkmark')}></span>
                                    </label>
                                </div>
                            </div>

                            {/*Mail */}
                            <div className={cx('form-row')}>
                                <label>
                                    Địa chỉ email
                                    <span> *</span>
                                </label>
                                <input value={email} onChange={e => setEmail(e.target.value)} type='email' name='email' id='email'></input>
                            </div>
                        </div>

                        <div className={cx('password')}>
                            {/*Password */}
                            <div className={cx('form-row')}>
                                <label>
                                    Mật khẩu
                                    <span> *</span>
                                </label>
                                <input value={password} onChange={e => setPassword(e.target.value)} type='password' name='password' id='password'></input>
                            </div>

                            {/*check password */}
                            <div className={cx('form-row')}>
                                <label>
                                    Nhập lại mật khẩu
                                    <span> *</span>
                                </label>
                                <input type='password' name='password2' id='password2'></input>
                            </div>
                        </div>

                        {/*7 */}
                        <div className={cx('form-row')}>
                            <label>
                                Số điện thoại
                                <span> *</span>
                            </label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} type='text' name='phone' id='phone'></input>
                        </div>

                        {/* Ngày sinh */}
                        <div className={cx('form-row', 'birth')}>
                            <label>
                                Ngày sinh
                                <span> *</span>
                            </label>

                            <div className={cx('birth-container')}>
                                <div className={cx('birth-item', 'day')}>
                                    <div className={cx('birth-item-select')}>
                                        <select onChange={e => { setDay(e.target.value) }} name="birthday_day">
                                            <option value="">Chọn ngày</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                            <option value="31">31</option>

                                        </select>
                                        <span>
                                            <span>Chọn ngày</span>
                                            <span>
                                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div className={cx('birth-item', 'month')}>
                                    <div className={cx('birth-item-select')}>
                                        <select onChange={e => setMonth(e.target.value)} name="birthday_month">
                                            <option value="">Chọn tháng</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                        </select>
                                        <span>
                                            <span>Chọn tháng</span>
                                            <span>
                                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                <div className={cx('birth-item', 'year')}>
                                    <div className={cx('birth-item-select')}>
                                        <select onChange={e => setYear(e.target.value)} name="birthday_year">
                                            <option value="">Chọn năm</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                            <option value="2022">2022</option>
                                            <option value="2021">2021</option>
                                            <option value="2020">2020</option>
                                            <option value="2019">2019</option>
                                            <option value="2018">2018</option>
                                            <option value="2017">2017</option>
                                            <option value="2016">2016</option>
                                            <option value="2015">2015</option>
                                            <option value="2014">2014</option>
                                            <option value="2013">2013</option>
                                            <option value="2012">2012</option>
                                            <option value="2011">2011</option>
                                            <option value="2010">2010</option>
                                            <option value="2009">2009</option>
                                            <option value="2008">2008</option>
                                            <option value="2007">2007</option>
                                            <option value="2006">2006</option>
                                            <option value="2005">2005</option>
                                            <option value="2004">2004</option>
                                            <option value="2003">2003</option>
                                            <option value="2002">2002</option>
                                            <option value="2001">2001</option>
                                            <option value="2000">2000</option>
                                            <option value="1999">1999</option>
                                            <option value="1998">1998</option>
                                            <option value="1997">1997</option>
                                            <option value="1996">1996</option>
                                            <option value="1995">1995</option>
                                            <option value="1994">1994</option>
                                            <option value="1993">1993</option>
                                            <option value="1992">1992</option>
                                            <option value="1991">1991</option>
                                            <option value="1990">1990</option>
                                            <option value="1989">1989</option>
                                            <option value="1988">1988</option>
                                            <option value="1987">1987</option>
                                            <option value="1986">1986</option>
                                            <option value="1985">1985</option>
                                            <option value="1984">1984</option>
                                            <option value="1983">1983</option>
                                            <option value="1982">1982</option>
                                            <option value="1981">1981</option>
                                            <option value="1980">1980</option>
                                            <option value="1979">1979</option>
                                            <option value="1978">1978</option>
                                            <option value="1977">1977</option>
                                            <option value="1976">1976</option>
                                            <option value="1975">1975</option>
                                            <option value="1974">1974</option>
                                            <option value="1973">1973</option>
                                            <option value="1972">1972</option>
                                            <option value="1971">1971</option>
                                            <option value="1970">1970</option>
                                            <option value="1969">1969</option>
                                            <option value="1968">1968</option>
                                            <option value="1967">1967</option>
                                            <option value="1966">1966</option>
                                            <option value="1965">1965</option>
                                            <option value="1964">1964</option>
                                            <option value="1963">1963</option>
                                            <option value="1962">1962</option>
                                            <option value="1961">1961</option>
                                            <option value="1960">1960</option>
                                            <option value="1959">1959</option>
                                            <option value="1958">1958</option>
                                            <option value="1957">1957</option>
                                            <option value="1956">1956</option>
                                            <option value="1955">1955</option>
                                            <option value="1954">1954</option>
                                            <option value="1953">1953</option>
                                            <option value="1952">1952</option>
                                            <option value="1951">1951</option>
                                            <option value="1950">1950</option>
                                            <option value="1949">1949</option>
                                            <option value="1948">1948</option>
                                            <option value="1947">1947</option>
                                            <option value="1946">1946</option>
                                            <option value="1945">1945</option>
                                            <option value="1944">1944</option>
                                            <option value="1943">1943</option>
                                            <option value="1942">1942</option>
                                            <option value="1941">1941</option>
                                            <option value="1940">1940</option>
                                            <option value="1939">1939</option>
                                            <option value="1938">1938</option>
                                            <option value="1937">1937</option>
                                            <option value="1936">1936</option>
                                            <option value="1935">1935</option>
                                            <option value="1934">1934</option>
                                        </select>
                                        <span>
                                            <span>Chọn năm</span>
                                            <span>
                                                <FontAwesomeIcon icon={faAngleDown}></FontAwesomeIcon>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('form-row', 'city')}>
                            <label>
                                Tỉnh/Thành phố
                                <span> *</span>
                            </label>
                        </div>

                        <div type="submit   "><Button type='submit' primary stretch className={'login-btn'}>ĐĂNG KÝ</Button></div>
                    </form>
                </div >
            </div >

        </div >
    </div >);
}


export default Register;