import { faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { BrowserView, MobileOnlyView } from 'react-device-detect';
import { useSelector } from 'react-redux';

import Login from '../components/Login/Login';
import AlertLogin from '../components/Main/AlertLogin';
import Mobile from '../components/Main/Mobile';
import Manual from '../components/Manual/Manual';
import useManual from '../hooks/useMaual';
import filterAutoComplete from '../utils/filterAutoComplete';

const Home: NextPage = () => <div>Home</div>;

export default Home;
